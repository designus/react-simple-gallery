module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',  
      'md': '768px',
      'lg': '1024px', 
      'xl': '1280px',  
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
        '25px': '25px',
        '30px': '30px',
        '36px': '36px',
        '46px': '46px',
        '56px': '56px'
      },
      zIndex: {
        '-10': '-10'
      }
    }
  },
  plugins: [],
}
