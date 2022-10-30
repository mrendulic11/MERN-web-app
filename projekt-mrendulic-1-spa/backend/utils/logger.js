const info = (...proizvodi) => {
  if (process.env.NODE_ENV !== "test")
      {console.log(...proizvodi);}
  }
   
  const greska = (...proizvodi) => {
    console.error(...proizvodi);
  }
   
  module.exports = {info, greska}
  