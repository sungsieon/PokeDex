import "../css/Navbar.css";
import { useState } from "react";
import Pokedex from "./Pokedex";
import Search from "./Search";

export default function Navbar({
  toggleLanguage,
  changeLanguage,
  toggleBright,
  changeBright,
}) {
  return (
    <>
      <div className={changeBright ? "blackNavbar" : "navbar"}>
        <div className="left_navbar">
        <a href="https://pokedex-nine-dusky-97.vercel.app/">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAa2SURBVHgB7VhrTBRXFP522eWNrNBSMYpD0yjxESCa1gRjwWiVBq0/5IePREnEZ0QpPzWCTfyD1FQSTTQxkGggok2o1mhJBRpr+kMNUARJNGHVgKGV92txl7095+6MWensi8UmTfiSs3d2Zu653z1zzrnnXmAWs/h/w4AgIYTIpOYbkjQSRRUNVlWaSX4yGAyNCBLTIkwkLdQcJTlGYtHuv379GkNDQxgdHYXJZEJsbCwWLVrk3tVK0khyishbMQ0ERHgq0eHhYdy+fRuPHz/Go0ePwP+nIiwsDMuXL8eGDRuQkZGBxMRE7VEJkT6FAOE3YSKrUNNAogwMDODatWuorq7GyMiIfJ7kcCLF7kCsUyBcCNgNBvxlNKLHZESbOeSdnpycHOzfv18jbiXJCsTafhEmsmkqWcutW7dw9uxZac2PJp3IHrdj6+gEYoikJ/SEGNESakJ1VBi6aAIhISE4cuQIdu3axY8HVNLN/nDxSdid7JkzZ6Rlo8iK+SM2fD32FoGiLiIUV6LD5CTWr1+P48ePIyYmxm/SBh9kFWqa2HcPHTqEhw8f4jP7JEoGRpEwKTBdMNnvYyPQTFZfsWIFysvLNdLpvtzD6EO3tOyFCxck2SybHWV9wZFlfEKuVEp6NpI7tba24sSJE3ybA7pBDezACVPHYmqUmpoaVFRUkGWdKBwcR6QIjqw7igbH8PmEAw8ePJABDFcOP+atj8EDWYWaTs6r+/btg62rG+W9I9IyM40Ryib5H0fDFhMjSc+fP59dI5lcY0DvfU8WZuvi8uXLcjHIG7b5TdZBJug3GjDpZ8KMpi9WMDQuFxsOarhcw6OVPVm4kxQo2dnZiBkewZW/h+ELf4SZ8COlrXbKuQ6DSy3n5RzKJF+Rr/rCt/HRaKMgrK+vlwFIFp6r955Rh2wmNQp3HBsbQy7lWG/gT/qdJRLFc6PwJw0YMWeOXNni4uLQYTahLDYSRXFRGDR6N/lGmhiNrfmyReXhmzBhK/80NDTIP19QUHjDOUpPv4eboSgKLl68KPtVVlairq4OV69exYIFC9BKEymeGwlv4ZpBGchEL/AS787DH8Kp/NPS0oJPHZNefffX8FD8RmQpUCTZlStXvvc8JSUF169fR3JyMrmKCT9HhnrUxb7M4z19+hR2u/0dD38Iy1phcHAQiQ7vgfZLpFm2J0+eRHx8vO47ZrNZPmfUR5i96mOfHx8fx5s3byQPvXdMOveU/v5+ecErUk1UKN6Sn7IHhpIV3tJVCH1cJ7VtZLU55LOrVq2CN/Bqxl+hrbsbldHhsr/JzT+0jNId4rLfixcvuDhS/CUsa1rGc4r45+YIeMO8efPgD5hwNxGuojrCF7g48gRdwhzhjMWLFyMrK0u3oxbR2uR8oaenR7Z79+6VNbLqpy4SVOw7HA5ZV7MYjcaACFspDyp8kZSUhPz8fI+dm5qaZI3Bg0wNuPcUWq149eoVli5digMHDnh8jxcO1kXjy2567+hNxWqxWGSn9vZ2eINaz+L06dPo7e3VfWdiYgJFRUXyOjc316u+Z8+eSWvzlw2EcAv/sMXY5/S2PRp4y7Nu3Tq8fPkSeXl5svJyB1uL73MQLVmyBJs3b/aoixcp/mKpqanv8ZgKPZeoJTm6Zs0aNDY24ubNm9i5cyc8gUtD9sf79+9LcgsXLkRCQoKcLNchjPT0dJSVlcEb7t27J+Ni7dq17jz+BU+1RD9Z1rJlyxaZR3nV8gXeOrE0NzfD6XTKSF+2bBm4HvHlCow9e/bgyZMnUgelNCvVEsnwF0S4hEScP39ekGuI2tpa4S+IrCDrCrK6331o5y3HKS4u1m5VIBBw1c9WppQlMjMzBfmpJPEhQG4jaCctCbuNoSBQCNXKVVVVUtn27dul9WYahw8flvqpYNJulWA6EC4rd7IGyo9SKQWYsNlsYibAky8tLZV6CwsLtdudCAakQCHpZ00HDx6Uynfs2BG0e1BhJSg3S327d+8WfX19Qh1HQbAgJWmqMkGpSQ6yadMmQelOTAd3794VdB4h9RQUFAiOE1V/GmYK7qTZ1zgQeUBaCCRxDhxvYFI3btwQVEfIftzfzWcDIjutszVeEC5duoQ7d+7IooXBKxnvOrTTSsqjcvHo6OiQSy6Dix5eGSnQtCrPig9xtjaFeAnUXTUT5y0NfWZZd+gt41yTcG2wevVqbNu2TStseAt/juQHT9v5GSOsklaoKSH5EurOgO7JErKrq0uWh/yfTyjdjleDIhoUYXcI1+6WN4xctSjQP4HnQqZ2Jk7gZzGLWfzH+Afj20+xeaYsBAAAAABJRU5ErkJggg==" />
          </a>
        </div>
        <div className="right_navbar">
          <span onClick={toggleLanguage}>{changeLanguage ? "A" : "한"}</span>
          <div onClick={toggleBright} className="sunBox">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 512.00 512.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              stroke="#000000"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#c15c5c"
                strokeWidth="1.024"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>sun-filled</title>{" "}
                <g
                  id="Page-1"
                  strokeWidth="0.00512"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="drop"
                    fill="#000000"
                    transform="translate(21.333333, 21.333333)"
                  >
                    {" "}
                    <path
                      d="M256,384 L256,469.333333 L213.333333,469.333333 L213.333333,384 L256,384 Z M355.346224,325.176335 L415.686003,385.516113 L385.516113,415.686003 L325.176335,355.346224 L355.346224,325.176335 Z M113.987109,325.176335 L144.156999,355.346224 L83.81722,415.686003 L53.6473307,385.516113 L113.987109,325.176335 Z M234.666667,118.01971 C299.089002,118.01971 351.313623,170.244331 351.313623,234.666667 C351.313623,299.089002 299.089002,351.314049 234.666667,351.314049 C203.711846,351.372867 174.007802,339.102338 152.119399,317.213934 C130.230995,295.325531 117.960466,265.621487 118.019285,234.666667 C118.019285,170.244331 170.244331,118.01971 234.666667,118.01971 Z M469.333333,213.333333 L469.333333,256 L384,256 L384,213.333333 L469.333333,213.333333 Z M85.3333333,213.333333 L85.3333333,256 L3.55271368e-15,256 L3.55271368e-15,213.333333 L85.3333333,213.333333 Z M83.81722,53.6473307 L144.156999,113.987109 L113.987109,144.156999 L53.6473307,83.81722 L83.81722,53.6473307 Z M385.516113,53.6473307 L415.686003,83.81722 L355.346224,144.156999 L325.176335,113.987109 L385.516113,53.6473307 Z M256,5.90116627e-13 L256,85.3333333 L213.333333,85.3333333 L213.333333,5.82278887e-13 L256,5.90116627e-13 Z"
                      id="Combined-Shape"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </div>
      </div>
      {/* <Search changeLanguage={changeLanguage}/> */}
    </>
  );
}
