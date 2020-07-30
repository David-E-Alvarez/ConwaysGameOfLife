(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],{13:function(e,t,n){},7:function(e,t,n){e.exports=n(8)},8:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(3),o=n(6),i=n(5),l=n(0),u=n.n(l),s=n(4),c=n.n(s),f=(n(13),function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return!1},t=[],n=0;n<40;n++){t[n]=[];for(var a=0;a<60;a++)t[n][a]=e()}return t}),d=function(e){for(var t=e.board_status,n=e.toggle_cell,a=[],r=function(e){for(var r=[],o=function(a){r.push(u.a.createElement("td",{key:"".concat(e,",").concat(a),className:t[e][a]?"alive":"dead",onClick:function(){return function(e,t){return n(e,t)}(e,a)}}))},i=0;i<60;i++)o(i);a.push(u.a.createElement("tr",{key:e},r))},o=0;o<40;o++)r(o);return u.a.createElement("table",null,u.a.createElement("tbody",null,a))},b=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(a.a)(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={board_status:f(),generation:0,isGameRunning:!1},e.buttons=function(){return e.state.isGameRunning?u.a.createElement("button",{type:"button",onClick:e.handle_stop},"Stop"):u.a.createElement("button",{type:"button",onClick:e.handle_start},"Start")},e.clear_board=function(){e.setState({board_status:f((function(){return!1})),generation:0})},e.new_board_instance=function(){e.setState({board_status:f(),generation:0})},e.handle_toggle_cell_status=function(t,n){var a=function(e){var a=JSON.parse(JSON.stringify(e.board_status));return a[t][n]=!a[t][n],a};e.setState((function(e){return{board_status:a(e)}}))},e.handle_step=function(){var t=function(e){for(var t=e.board_status,n=JSON.parse(JSON.stringify(t)),a=function(e,n){return[[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]].reduce((function(a,r){var o=e+r[0],i=n+r[1];return a<4&&(o>=0&&o<40&&i>=0&&i<60)&&t[o][i]?a+1:a}),0)},r=0;r<40;r++)for(var o=0;o<60;o++){var i=a(r,o);t[r][o]?(i<2||i>3)&&(n[r][o]=!1):3===i&&(n[r][o]=!0)}return n};e.setState((function(e){return{board_status:t(e),generation:e.generation+1}}))},e.handle_start=function(){e.setState({isGameRunning:!0})},e.handle_stop=function(){e.setState({isGameRunning:!1})},e}return Object(r.a)(n,[{key:"componentDidUpdate",value:function(e,t){var n=this.state.isGameRunning;t.isGameRunning,t.isGameRunning}},{key:"render",value:function(){var e=this.state,t=e.board_status,n=e.isGameRunning,a=e.generation;return u.a.createElement("div",{className:"App"},u.a.createElement("h1",null,"Conway's Game of Life"),u.a.createElement("section",null,u.a.createElement("h5",null,"Rules:"),u.a.createElement("ul",null,u.a.createElement("li",null,"Any live cell with fewer than two live neighbours dies, as if by underpopulation"),u.a.createElement("li",null,"Any live cell with two or three live neighbours lives on to the next generation"),u.a.createElement("li",null,"Any live cell with more than three live neighbours dies, as if by overpopulation"),u.a.createElement("li",null,"Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction")),u.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules"},"Wikipedia")),u.a.createElement(d,{board_status:t,toggle_cell:this.handle_toggle_cell_status}),u.a.createElement("div",null,"Generation: ".concat(a)),u.a.createElement("div",null,this.buttons(),u.a.createElement("button",{type:"button",disabled:n,onClick:this.handle_step},"Step"),u.a.createElement("button",{type:"button",onClick:this.clear_board},"Clear Board"),u.a.createElement("button",{type:"button",onClick:this.new_board_instance},"New Board")))}}]),n}(l.Component);c.a.render(u.a.createElement(b,null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.471f052e.chunk.js.map