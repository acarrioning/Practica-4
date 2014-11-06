describe("Clase FireBall", function(){
        var canvas, ctx;
        beforeEach(function(){
        loadFixtures('index.html');
        canvas = $('#game')[0];
        expect(canvas).toExist();
        ctx = canvas.getContext('2d');
        expect(ctx).toBeDefined();
        });
        //Bolas de fuego
        it("Fireball",function(){
                SpriteSheet = {map : {ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },fireball: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
} 
                };              
                var spaceShip = new PlayerShip();
                board.add(spaceShip);       
                Game.keys['fwN'] = true;
                board.step(0.5);
                expect(board.objects.length).toBe(2);
                expect(board.objects[1].x).toBe(board.objects[0].x+board.objects[0].w - board.objects[1].w/2);
                expect(board.objects[1].y).toBe(board.objects[0].y+board.objects[0].h/2 - board.objects[1].h);
        });
});


