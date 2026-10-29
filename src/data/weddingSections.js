import { publicAsset } from '../utils/publicAsset.js'
// Sample copy and supplied photos; replace these with the couple's real memories.
export default {
 traditions: [
  {title:'Jeelakarra Bellam',subtitle:'An inseparable bond',image:publicAsset('images/gallery/05.jpg'),alt:'Sample couple taking part in a wedding ritual',position:'50% 35%',description:'Cumin and jaggery come together in a sacred gesture, symbolising two lives joining as one.'},
  {title:'Mangalyadharana',subtitle:'A promise for a lifetime',image:publicAsset('images/gallery/06.jpg'),alt:'Sample traditional wedding ceremony portrait',position:'50% 40%',description:'The tying of the mangalsutra marks a cherished commitment to love, care, and a shared future.'},
  {title:'Talambralu',subtitle:'Blessings, with a little joy',image:publicAsset('images/gallery/02.jpg'),alt:'Sample couple beneath a floral wedding canopy',position:'50% 35%',description:'A joyful shower of rice carries wishes for happiness, abundance, and a life filled with laughter.'},
 ],
 familyBlessings:{image:publicAsset('images/gallery/01.jpg'),alt:'Sample wedding portrait accompanying the families’ blessing',message:'With grateful hearts and the blessings of our elders, we welcome you to celebrate this beautiful new chapter. Your presence will make our joy complete.',closing:'Together, with love and blessings'},
 story:[
  {chapter:'01',title:'A chance meeting',label:'Where it all began',image:publicAsset('images/gallery/03.jpg'),alt:'Sample couple sharing a quiet moment',position:'50% 35%',description:'A simple hello at a friend’s celebration became a conversation neither of us wanted to end.'},
  {chapter:'02',title:'Choosing each other',label:'A little question, a beautiful yes',image:publicAsset('images/gallery/08.jpg'),alt:'Sample couple forming a heart with their hands',position:'50% 35%',description:'Through little adventures and everyday moments, friendship grew into a promise to walk through life together.'},
  {chapter:'03',title:'Our forever begins',label:'February 19, 2027',image:publicAsset('images/our-forever-begins.png'),alt:'Couple sharing a playful moment in ivory and green attire beneath a stone arch',position:'50% 35%',description:'Now, surrounded by our families and the people we love, we are ready to begin our next chapter.'},
 ],
}
