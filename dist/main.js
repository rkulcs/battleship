(()=>{var r={417:(r,t,e)=>{const o=e(498),a=e(507);r.exports=()=>{const r=(()=>{const r=o(),t=o();return{playerBoard:r,aiBoard:t,player:a(r,t),ai:a(t,r)}})();r.player,r.ai,console.log("test")}},498:r=>{r.exports=()=>{const r=(()=>{const r=[];for(let t=0;t<10;t++){r[t]=[];for(let e=0;e<10;e++)r[t][e]=!1}return r})(),t=[],e=()=>r,o=()=>t;return{getTiles:e,getShips:o,addShip:r=>{o().push(r)},strike:(r,t)=>{e()[t][r]=!0;for(let e=0;e<o().length;e++)o()[e].hit(r,t)},allShipsSunk:()=>{for(let r=0;r<o().length;r++)if(!o()[r].isSunk())return!1;return!0}}}},507:r=>{r.exports=(r,t)=>{const e=()=>t,o=(r,t)=>!e().getTiles()[t][r]&&(e().getTiles()[t][r]=!0,!0);return{getShipBoard:()=>r,getTargetBoard:e,makeMove:o,aiMove:()=>{let r=Math.floor(9*Math.random()),t=Math.floor(9*Math.random());for(;!o(r,t););}}}}},t={};!function e(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return r[o](n,n.exports,e),n.exports}(417)()})();