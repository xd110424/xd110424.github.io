// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = [0, canvas.width, 0], y = [0, 0, canvas.height], dx = [5, 5, 5], dy = [5, 5, 5], r = [30, 20, 10], m = [10, 8, 5], color = ["blue", "red", "yellow"];
let N = 3;

// 畫圓形
function drawBall(x, y, r, color)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// 更新畫布
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i =0; i < N; i ++) {
        x[i] = x[i] + dx[i];
        y[i] = y[i] + dy[i];
    }
   
        // TODO: 如果發生碰撞(畫布寬canvas.width, 畫布高canvas.height)，則改變速度(dx, dy)和顏色(color)
        // ...
    for (let i = 0; i < N; i ++) {
        if (x[i] < 0 || x[i] > canvas.width) dx[i] = -dx[i];
        if (y[i] < 0 || y[i] > canvas.width) dy[i] = -dy[i];
    }
    //待完成
    for(let i = 0; i < N; i ++) {
        for (let j = i+1; j < N; j++) {
            if ((x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j]) <= (r[i]+r[j]) * (r[i]+r[j])) {
                let vcx = (m[i]*dx[i] + m[j]*dx[j]) / (m[i]+m[j]);
                let vcy = (m[i]*dy[i] + m[j]*dy[j]) / (m[i]+m[j]);
                dx[i] = vcx*2 - dx[i];
                dx[j] = vcx*2 - dx[j];
                dy[i] = vcy*2 - dy[i];
                dy[j] = vcy*2 - dy[j];
            }
        }
    }
    //if ((x-x1)*(x-x1) + (y-y1)*(y-y1) <= (r+r1)*(r+r1)) {
    // [x, x1] = [x1, x];
    // [y, y1] = [y1, y];
    //}
    //drawBall(x, y, r, color);
    //drawBall(x1, y1, r1, color1);
   
    for (let i =0; i < N; i ++) {
        drawBall(x[i], y[i], r[i], color[i]);
    }
    requestAnimationFrame(draw);
}
draw();