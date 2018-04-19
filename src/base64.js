import { isBrowser } from './helpers'

// Courtesy: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem

const decode = input => isBrowser ? decodeURIComponent(atob(input).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')) : atob(input)
const encode = input => isBrowser ? btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`))) : btoa(input)

const btoa = isBrowser ? window.btoa : i => Buffer.from(i).toString('base64')
const atob = isBrowser ? window.atob : i => Buffer.from(i, 'base64').toString()

export default {
  decode,
  encode
}
