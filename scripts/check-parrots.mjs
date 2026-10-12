import assert from 'node:assert/strict'
import {chromium} from '@playwright/test'
import data from '../src/data/invitation.js'
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
try{
 const page=await browser.newPage({viewport:{width:390,height:844}})
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('http://127.0.0.1:5173/invitation/'+data.slug)
 assert.equal(await page.locator('.hero-parrots').evaluate(el=>getComputedStyle(el).visibility),'hidden','Birds must wait for opening')
 await page.getByRole('button',{name:'Open Invitation'}).click()
 await page.getByRole('dialog',{name:'Open wedding invitation'}).waitFor({state:'hidden'})
 assert.equal(await page.locator('.hero-parrots').getAttribute('data-stage'),'arriving')
 assert.equal(await page.locator('.parrot-flight').count(),2)
 await page.waitForTimeout(1300);await page.screenshot({path:'artifacts/parrots-flying-mobile.png'})
 await page.waitForFunction(()=>document.querySelector('.hero-parrots')?.dataset.stage==='settled')
 assert.equal(await page.locator('.parrot-flight').count(),0,'Flight sprites must disappear after the single arrival')
 assert.equal(await page.locator('[data-artwork="parrot-perched"]').count(),2)
 await page.screenshot({path:'artifacts/parrots-perched-mobile.png'})
 for(const width of [360,640,768,1024,1440]){
  await page.setViewportSize({width,height:900})
  assert.equal(await page.locator('.hero-parrots').getAttribute('data-stage'),'settled','Resizing must not replay flight')
  assert.equal(await page.locator('body').evaluate(el=>el.scrollWidth>innerWidth),false)
  const positions=await page.locator('.parrot-spot').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}))
  const ganesha=await page.locator('.hero-ganesha').boundingBox()
  for(const bird of positions){assert.ok(bird.x>=0&&bird.right<=width);assert.ok(bird.y<ganesha.y+ganesha.height&&bird.bottom>ganesha.y,'Parrots must settle alongside Ganpati')}
  assert.ok(positions[0].right<ganesha.x&&positions[1].x>ganesha.x+ganesha.width,'Parrots must not overlap Ganpati')
 }
 await page.screenshot({path:'artifacts/parrots-perched-desktop.png'})
 await page.locator('#memories').scrollIntoViewIfNeeded();await page.locator('#home').scrollIntoViewIfNeeded()
 assert.equal(await page.locator('.parrot-flight').count(),0,'Scrolling must not replay flight')
 const still=await browser.newPage({viewport:{width:360,height:800},reducedMotion:'reduce'})
 const flyingRequests=[];still.on('request',r=>{if(r.url().includes('/parrot-flying.png'))flyingRequests.push(r.url())})
 await still.goto('http://127.0.0.1:5173/invitation/'+data.slug)
 await still.getByRole('button',{name:'Open Invitation'}).click()
 await still.getByRole('dialog',{name:'Open wedding invitation'}).waitFor({state:'hidden'})
 assert.equal(await still.locator('.hero-parrots').getAttribute('data-stage'),'settled')
 assert.equal(await still.locator('.parrot-flight').count(),0)
 assert.deepEqual(flyingRequests,[],'Reduced motion should not load flying sprites')
 assert.equal(await still.locator('.parrot-idle').first().evaluate(el=>getComputedStyle(el).animationName),'none')
 assert.equal(await still.locator('.parrot-rest').first().evaluate(el=>getComputedStyle(el).opacity),'1')
 assert.equal(await still.locator('.hero .theme-hanging-lamp').first().evaluate(el=>getComputedStyle(el).animationName),'none')
 assert.deepEqual(errors,[])
 console.log('Passed: two parrots fly once after opening, settle on either side of Ganpati, no replay on resize/scroll, five responsive widths, reduced-motion still images with no flight download; no page errors.')
}finally{await browser.close()}
