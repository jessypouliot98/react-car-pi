class Converter{

  static arrayBufferToBase64 = (buffer, prepend = '') => {
    let bin = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      bin += String.fromCharCode(bytes[i]);
    }

    return prepend + window.btoa(bin);
  }

  static secondToTime = (value) => {
    const hour = Math.floor(value / 3600);
    const min = Math.floor(value / 60);
    const sec = Math.round(value % 60);

    return { hour, min, sec };
  }

  static mToKm = (value) => {
    let km = value / 1000;

    km = parseFloat(km.toFixed(1));

    return km
  }

}

export default Converter
