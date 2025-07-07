const loaderHTML = (uri) => `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('${uri}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          width: 130px;
          height: 130px;
        }
        .loader div {
          position: absolute;
          height: 1.2em;
          width: 1.2em;
          border-radius: 5px;
          background-color: white;
          box-shadow: 0 1px 7px rgba(0,0,0,0.3);
        }
        .load2 { animation: 2s flow2 infinite; }
        .load3 { animation: 2s flow3 infinite; }
        .load4 { animation: 2s flow4 infinite; }
        .load5 { animation: 2s flow5 infinite; }
        .load6 { animation: 6s flow6 infinite; }
        .load7 { animation: 6s flow7 infinite; }
        .load8 { animation: 6s flow8 infinite; }
        .load9 { animation: 6s flow9 infinite; }

        @keyframes flow2 { 50% { transform: translateX(3em); } 100% { transform: translateX(0); } }
        @keyframes flow3 { 50% { transform: translateX(-3em); } 100% { transform: translateX(0); } }
        @keyframes flow4 { 50% { transform: translateY(3em); } 100% { transform: translateY(0); } }
        @keyframes flow5 { 50% { transform: translateY(-3em); } 100% { transform: translateY(0); } }
        @keyframes flow6 {
          30% { transform: translateX(3em); }
          60% { transform: translateX(3em) translateY(-3em); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes flow7 {
          30% { transform: translateX(-3em); }
          60% { transform: translateX(-3em) translateY(3em); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes flow8 {
          30% { transform: translateY(3em); }
          60% { transform: translateY(3em) translateX(3em); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes flow9 {
          30% { transform: translateY(-3em); }
          60% { transform: translateY(-3em) translateX(-3em); }
          100% { transform: translateX(0) translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="loader">
        <div class="load1"></div>
        <div class="load2"></div>
        <div class="load3"></div>
        <div class="load4"></div>
        <div class="load5"></div>
        <div class="load6"></div>
        <div class="load7"></div>
        <div class="load8"></div>
        <div class="load9"></div>
      </div>
    </body>
  </html>
`;
export default loaderHTML;