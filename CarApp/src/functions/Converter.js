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

}

export default Converter
