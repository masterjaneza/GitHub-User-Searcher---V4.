import { useEffect, useRef } from 'react';
import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';
import '../index.css';

let MainCard = () => {
  const inputRef = useRef(null);
  const userNameSpanRef = useRef(null);
  const imgRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const appElement = document.getElementById('app');
    if (appElement) {
      neonCursor({
        el: appElement,
        shaderPoints: 16,
        curvePoints: 80,
        curveLerp: 0.5,
        radius1: 5,
        radius2: 30,
        velocityTreshold: 10,
        sleepRadiusX: 100,
        sleepRadiusY: 100,
        sleepTimeCoefX: 0.0025,
        sleepTimeCoefY: 0.0025,
      });
    }
  }, []);

  const userFetch = async () => {
    const input = inputRef.current;
    const userNameSpan = userNameSpanRef.current;
    const img = imgRef.current;
    const link = linkRef.current;

    const userName = input.value.trim().replace(/\s+/g, '');

if (!userName) {
  let timerInterval;
  Swal.fire({
    title: 'Error',
    html: '<span style="font-family: Bruno Ace SC; color: #fec7d7;">Please Input User Name</span>',
    icon: 'error',
    timer: 2500,
    timerProgressBar: true,
    background: 'rgba(17, 24, 39, 0.9)',
    backdrop: `
      rgba(0,0,0,0.8)
    `,
    showConfirmButton: false,
    didOpen: () => {
      // Hide all background elements
      document.querySelectorAll('body > *:not(.swal2-container)').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
      });
      
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        if (timer) timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      // Restore all background elements
      document.querySelectorAll('body > *:not(.swal2-container)').forEach(el => {
        el.style.opacity = '1';
      });
      clearInterval(timerInterval);
    },
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      timerProgressBar: 'custom-progress-bar',
      loader: 'custom-loader'
    }
  });
  return;
}


    const api = `https://api.github.com/users/${userName}`;

    try {
      const response = await fetch(api);
      if (!response.ok) throw new Error(`Status is not valid ${response.status}`);
      const { login, html_url, avatar_url } = await response.json();

      userNameSpan.innerHTML = `<span style="color: #2cb67d; text-decoration: underline;">${login}</span>`;
      img.src = avatar_url;
      link.innerHTML = `<a style="color: #2cb67d; font-size: 22px; padding-left: 10px;" href="${html_url}" target="_blank">${html_url}</a>`;
      input.value = '';
    
    } catch (err) {
      console.log(`Failed: ${err}`);
      userNameSpan.innerHTML = `<span style="color: red; text-decoration: line-through;">User Not Found</span>`;
      img.src = '/images/github logo.png';
      link.innerHTML = '<a style="color: #e16162;">There is no Link!</a>';
    }
  };

  return (
    <main className="flex justify-center items-center relative transition-all">
      {/* Background Layer for blur */}
      <div className="background-layer fixed top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_#004643,_#195e59)] z-0"></div>

      {/* Main card */}
      <div className="glass-blur absolute w-[1100px] h-[700px] rounded-[20px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[25px] border border-[rgba(255,_255,_255,_0.55)] shadow-[0px_4px_250px_90px_rgba(255,255,255,0.25)] z-1 flex justify-center items-center gap-[110px] flex-col max-[1025px]:w-[900px] max-[769px]:w-[700px] max-[426px]:w-[400px] max-[376px]:w-[360px] max-[321px]:w-[310px]">
       
       <div className="parent flex gap-[30px] max-[426px]:flex-col">
          <input
            ref={inputRef}
            className="user-name w-[300px] h-[50px] rounded-[40px] border-none shadow-[0_2px_3px_black] bg-[#FFFDFD] transition-all duration-[0.45s] cursor-pointer text-[1.1em] hover:w-[310px] focus:outline-none focus:shadow-[0_4px_25px_9px_rgba(255,255,255,0.25)] font-brunoAceSC placeholder:font-black placeholder:text-[1.1em] placeholder:pl-0 placeholder:tracking-[2px] !pl-[20px]  max-[321px]:w-[280px] "
            type="text"
      
            placeholder="Enter User Name: "
            onKeyDown={
                (e) => {
                    if(e.key === 'Enter') userFetch();
                }
            }
          />
          <button
            onClick={userFetch}
            className="search w-[150px] h-[50px] bg-[#F9BC60] rounded-[40px] border-none font-light font-brunoAce text-[1.3em] shadow-[0_2px_3px_black] transition-all duration-[0.45s] hover:w-[160px] hover:cursor-pointer focus:outline-none focus:shadow-[0_4px_25px_9px_rgba(249,188,96,0.25)] max-[426px]:w-[260px] max-[426px]:!ml-[20px]
            max-[321px]:w-[200px] max-[321px]:!ml-[40px]
            "
          >
            Search
          </button>
        </div>

        <div
          className="child-div w-[800px] h-[400px] rounded-[20px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(171,209,198,0.25))] backdrop-blur-[23px] z-1 shadow-[0_0_40px_rgba(0,0,0,0.2),_inset_2px_2px_22.8px_2px_rgba(0,0,0,0.25)] flex justify-center items-center flex-col gap-[90px] max-[769px]:w-[650px] max-[426px]:w-[350px] max-[426px]:gap-[42px] max-[376px]:w-[330px] max-[321px]:w-[280px] "
          style={{ border: '1px solid rgba(255, 255, 255, 0.55)' }}
        >
          <h1 className="text-white capitalize font-brunoAceSC text-center break-words w-full max-w-full text-[32px] max-[426px]:text-[26px]">
            user name: <span ref={userNameSpanRef}></span>
          </h1>

          <div className="child-div-content flex justify-center items-center flex-col gap-[30px] text-center break-words w-full max-w-full">
            <img
              ref={imgRef}
              src="/images/github logo.png"
              className="w-[130px] h-[130px] rounded-[50%]"
            />
            <h1 className="link text-[32px] font-brunoAceSC text-white">
              Link:
              <span className="linkTag" ref={linkRef}></span>
            </h1>
          </div>
        </div>
      </div>

      {/* <div className="div1 mt-[-230px] w-[150px] h-[150px] bg-[#00ffcc] z-0"></div> */}

        <div id="app" className="w-screen h-screen fixed left-0 top-0 pointer-events-none">
          <div id="hero"></div>
        </div>
    </main>
  );
};

export default MainCard;