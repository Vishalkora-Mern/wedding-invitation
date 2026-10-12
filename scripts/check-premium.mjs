import assert from 'node:assert/strict'
import fs from 'node:fs'
import {chromium} from '@playwright/test'
import data from '../src/data/invitation.js'
import {createCalendar} from '../src/utils/calendar.js'

const calendar=createCalendar(data,new Date('2026-10-12T00:00:00Z'))
assert.ok(calendar.includes('DTSTART:20270219T050600Z\r\n'),'Muhurtham must convert from IST to UTC')
assert.ok(calendar.includes('DTEND:20270219T070600Z\r\n'),'Duration must be two hours')
for(const line of calendar.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75,'Calendar line exceeds 75 UTF-8 bytes')
const special=structuredClone(data);special.couple.groom.name='A,;\\\nB';special.guestDetails.calendarDurationMinutes=30
const specialCalendar=createCalendar(special).replace(/\r\n /g,'')
assert.ok(specialCalendar.includes('A\\,\\;\\\\\\nB'),'Calendar text must escape control characters')
assert.ok(specialCalendar.includes('DTEND:20270219T053600Z'),'Custom duration must be respected')

const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message))
 await page.setViewportSize({width:390,height:844})
 await page.goto('http://127.0.0.1:5173/invitation/'+data.slug)
 await page.waitForTimeout(1300);await page.screenshot({path:'artifacts/premium-entry.png'})
 assert.equal(await page.locator('.splash .hanging-lamp').count(),2)
 assert.ok(await page.locator('audio').evaluate(el=>el.paused),'Sound must wait for the opening gesture')
 await page.getByRole('button',{name:'Open Invitation'}).click()
 await page.getByRole('dialog',{name:'Open wedding invitation'}).waitFor({state:'hidden'})
 await page.waitForTimeout(2000);await page.screenshot({path:'artifacts/premium-hero.png'})
 await page.waitForFunction(()=>document.querySelector('audio').currentTime>0)
 await page.emulateMedia({reducedMotion:'reduce'})
 for(const width of [360,640,768,1024,1440]){
  await page.setViewportSize({width,height:900})
  assert.equal(await page.locator('body').evaluate(el=>el.scrollWidth>innerWidth),false,`Horizontal overflow at ${width}px`)
 }
 assert.equal(await page.locator('.featured-event').count(),1)
 assert.equal(await page.locator('.featured-event .event-description').evaluate(el=>getComputedStyle(el).color),'rgb(237, 220, 194)','Featured panel description must remain readable')
 assert.equal(await page.locator('.featured-event .ritual-chips span').count(),3)
 assert.equal(await page.locator('.guest-actions a').getAttribute('href'),data.venue.mapsUrl)
 assert.ok(await page.getByText('Venue photo to come',{exact:true}).isVisible())
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Add to calendar'}).click();const download=await pending
 await download.saveAs('artifacts/wedding-calendar.ics')
 const saved=fs.readFileSync('artifacts/wedding-calendar.ics','utf8');assert.ok(saved.includes('DTSTART:20270219T050600Z'))
 assert.ok(saved.replace(/\r\n /g,'').includes(data.venue.name))
 assert.equal(await page.locator('.lamp-flame').first().evaluate(el=>getComputedStyle(el).animationName),'none')
 for(let y=0;y<await page.locator('body').evaluate(el=>el.scrollHeight);y+=600){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(65)}
 await page.locator('#celebrations').screenshot({path:'artifacts/premium-ceremonies.png'})
 await page.locator('#guest-details').screenshot({path:'artifacts/premium-guest-details.png'})
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'artifacts/premium-desktop.png',fullPage:true})
 await page.setViewportSize({width:360,height:800});await page.screenshot({path:'artifacts/premium-mobile.png',fullPage:true})
 assert.deepEqual(errors,[])
 console.log('Passed: IST calendar conversion, duration, escaping/line folding, actual calendar download, venue directions, featured ceremony, lamps/BGM, five responsive widths, reduced motion; no page errors.')
}finally{await browser.close()}
