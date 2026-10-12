const escapeText=value=>String(value??'').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')
const utc=date=>new Date(date).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')
// Fold content lines at 75 UTF-8 bytes, including the continuation space.
function fold(line){const encoder=new TextEncoder();const parts=[];let part='';for(const char of line){if(encoder.encode(part+char).length>75){parts.push(part);part=' '+char}else part+=char}parts.push(part);return parts.join('\r\n')}
export function createCalendar(data,now=new Date()){
 const start=new Date(data.weddingDate),end=new Date(start.getTime()+(data.guestDetails.calendarDurationMinutes||120)*60000)
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Temple Wedding Invitation//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${data.slug}-${utc(start)}@wedding-invitation`,`DTSTAMP:${utc(now)}`,`DTSTART:${utc(start)}`,`DTEND:${utc(end)}`,`SUMMARY:${escapeText(`${data.couple.groom.name} & ${data.couple.bride.name} — Wedding`)}`,`LOCATION:${escapeText(`${data.venue.name}, ${data.venue.address}`)}`,`DESCRIPTION:${escapeText(`${data.invitationLine}\nMuhurtham: ${data.muhurtham}\nDirections: ${data.venue.mapsUrl}`)}`,`URL:${data.venue.mapsUrl}`,'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n')+'\r\n'
}
export function downloadCalendar(data){const url=URL.createObjectURL(new Blob([createCalendar(data)],{type:'text/calendar;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=`${data.slug}-wedding.ics`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
