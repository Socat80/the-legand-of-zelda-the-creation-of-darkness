// Add your code here
// Add your code here
namespace Testing {
    // left, up, down, right
    let options = [[-1, 0], [0, -1], [0, 1], [1, 0]]

    function idiv(x: number, y: number): number {
        return ~~(x / y);
    }

    function getNearestTile(x: number, y: number): number[] {
        return [idiv(x, 16), idiv(y, 16)];
    }

    //% block
    export function isCenterOfTile(s: Sprite): boolean {
        let nt = getNearestTile(s.x, s.y);
        nt[0] *= 16;
        nt[1] *= 16;
        /*
        console.logValue("nt.x", nt[0]);
        console.logValue("nt.y", nt[1]);
        console.logValue("s.x", s.x);
        console.logValue("s.y", s.y);
        */
        if (Math.abs(nt[0] - s.x + 8) == 0 && Math.abs(nt[1] - s.y + 8) == 0) {
            //console.log("centered");
            return true;
        }
        return false;
    }

    //% block
    export function mazeMove(s: Sprite, t: Sprite, v: number) {
        if (isCenterOfTile(s)) {
            let allowedDirections = [];
            let tilePos = getNearestTile(s.x, s.y);
            for (let i = 0; i < 4; i++) {
                if (scene.getTile(
                    tilePos[0] + options[i][0],
                    tilePos[1] + options[i][1]
                ).tileSet != 13) {
                    allowedDirections.push(true);
                } else {
                    allowedDirections.push(false);
                }
            }
            if (s.vx < 0) {
                allowedDirections[3] = false;
            } else if (s.vx > 0) {
                allowedDirections[0] = false;
            } else if (s.vy < 0) {
                allowedDirections[2] = false;
            } else if (s.vy > 0) {
                allowedDirections[1] = false;
            }
            let dx = t.x - s.x;
            let dy = t.y - s.y;
            let option = 4;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx < 0 && allowedDirections[0]) {
                    s.vx = -v;
                    s.vy = 0;
                    option = 0;
                } else if (dx > 0 && allowedDirections[3]) {
                    s.vx = v;
                    s.vy = 0;
                    option = 3;
                } else if (dy < 0 && allowedDirections[1]) {
                    s.vx = 0;
                    s.vy = -v;
                    option = 1;
                } else if (dy > 0 && allowedDirections[2]) {
                    s.vx = 0;
                    s.vy = v;
                    option = 2;
                }
            } else {
                if (dy < 0 && allowedDirections[1]) {
                    s.vx = 0;
                    s.vy = -v;
                    option = 1;
                } else if (dy > 0 && allowedDirections[2]) {
                    s.vx = 0;
                    s.vy = v;
                    option = 2;
                } else if (dx < 0 && allowedDirections[0]) {
                    s.vx = -v;
                    s.vy = 0;
                    option = 0;
                } else if (dx > 0 && allowedDirections[4]) {
                    s.vx = v;
                    s.vy = 0;
                    option = 3;
                }
            }
            if (option == 4) {
                let dir = allowedDirections.indexOf(true);
                if (dir == -1) {
                    s.vx = -s.vx;
                    s.vy = -s.vy;
                    if (s.vx < 0) {
                        option = 0;
                    } else if (s.vx > 0) {
                        option = 3;
                    } else if (s.vy < 0) {
                        option = 1;
                    } else {
                        option = 2;
                    }
                } else {
                    s.vx = options[dir][0] * v;
                    s.vy = options[dir][1] * v;
                    option = dir;
                }
            }
            s.x += options[option][0];
            s.y += options[option][1];
        }
    }
}

