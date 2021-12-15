export const CURRENCY = 'EUR'
export const SYMBOL_EUR = '€'
export const SYMBOL_USD = '$'
export const AMOUNT = 240.0
export const AMOUNT_USD = 280.0
export const DISCOUNT = 0
export const MIN_AMOUNT = 160.0
export const MAX_AMOUNT = 3250.0
export const AMOUNT_STEP = 5.0
export const EU_SHIPPING = 0
export const WORLD_SHIPPING = 25

export const packageImages = [
  '/images/package/cyber_package1.jpg',
  '/images/package/cyber_package2.jpg',
  '/images/package/cyber_package3.jpg',
  '/images/package/cyber_package4.jpg',
]

const en = [
  {
    q: 'When I can redeem the physical cyber?',
    a: "If you're a token holder, you can redeem your Cyber EDP at any time after August 8th. Join us on Discord to follow the announcements.",
  },
  {
    q: 'Is the label blinking in red like in the NFT?',
    a: 'Yes, when you press it lights up in bright red light.',
  },
  {
    q: 'What`s in the package?',
    a: 'Each Cyber Eau de Parfum will be labeled with the NFT token number and hand signed by the creators. Also, you’ll receive a certificate for authenticity.',
  },
  {
    q: 'Are you shipping Worldwide?',
    a: "Yes, we’ll ship the physical Cyber EDP worldwide. There can be additional taxes as imports and taxes.",
  },
  {
    q: 'Is Cyber Vegan?',
    a: 'Absolutely. No animal ingredients have been used in the formulation.',
  },
  {
    q: 'How much will the label last?',
    a: 'We guarantee 500 interactions. By interaction, we define the press of the button on the label for no more than one (1) second.',
  },
  {
    q: 'Is the label rechargeable?',
    a: 'The battery isn`t rechargeable. You can ask us for a label replacement by contacting us.',
  },
  {
    q: 'Are you planning to offer refills?',
    a: "We're thinking of the possibility to offer refills for the token owners.",
  },
  {
    q: 'How was the scent encoded into the NFT?',
    a: 'The scent was extracted using NIR and encoded into the NFT artwork in the form of spectrogram.',
  },
  {
    q: 'How many units have you reserved for the team and giveaways?',
    a: 'We have reserved 10 units for the team, giveaways, and special thanks to people who helped us making the project happen.',
  },
]

const nft = [
  {
    q: '100ml / 3.4oz',
    a: 'The bottle is refillable and we plan to offer refills for token owners.',
  },
  {
    q: 'Made in Grasse, France',
    a: 'We worked together with a master perfumer to develop the scent in the capital of fragrances Grasse, France.',
  },
  {
    q: 'Scent minted on blockchain',
    a: 'Using NIRS we extracted the scent and mint it as part of the NFT artwork. The raw spectrum data files are also available in the NFT.',
  },
  { q: 'Physical redeemable', a: 'Anytime redeemable for token owners.' },
  {
    q: 'Printed electronics label',
    a: 'With sustainable OLED lights and blinks in red when pressed.',
  },
  {
    q: 'Worldwide shipping',
    a: 'We can ship worldwide but there can be additional fees for customs and VAT.',
  },
  { q: 'UNISEX', a: 'The Metaverse has no gender.' },
  { q: 'Refillable', a: 'Refills only for token owners.' },
  { q: 'ERC721', a: 'The physical will match the ERC721 token number.' },
]

export const faqList = {
  en: en,
  nft: nft,
}

export const videos = {
  nft: {
    desktop: '/nft/360.mp4',
    mobile: '/nft/360.mp4',
    preload: 'metadata',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  cold_zero: {
    desktop: '/nft/360_drop.mp4',
    mobile: '/nft/360_drop.mp4',
    preload: 'metadata',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  cyber: {
    desktop: '/videos/cyber_blink_desktop.mp4',
    mobile: '/videos/cyber_blink_mobile.mp4',
    preload: 'metadata',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  expand: {
    desktop: '/videos/cyber_expand_desktop.mp4',
    mobile: '/videos/cyber_expand_mobile.mp4',
    preload: 'auto',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  blink: {
    desktop: '/videos/cyber_1.mp4',
    mobile: '/videos/cyber_1.mp4',
    preload: 'auto',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  intro: {
    desktop: '/videos/cyber_intro_desktop.mp4',
    mobile: '/videos/cyber_intro_mobile.mp4',
    thumb: {
      desktop: '',
      mobile: '',
    },
  },
  vipe: {
    desktop: '/videos/cyber_viper_desktop.mp4',
    mobile: '/videos/cyber_viper_mobile.mp4',
    preload: 'auto',
    thumb: {
      desktop: '/videos/cover/cyber_viper_desktop.jpg',
      mobile: '/videos/cover/cyber_viper_mobile.jpg',
    },
    thumbName: 'cyber EDP',
  },
}
