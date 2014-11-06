describe("Clase SpriteSpec", function(){
        beforeEach(function(){
                loadFixtures('index.html');
                canvas = $('#game')[0];
                expect(canvas).toExist();
                ctx = canvas.getContext('2d');
                expect(ctx).toBeDefined(); 
                
        });

        it("SpriteSpec Draw", function(){
                SpriteSheet = {draw: function(){},};
                NuevoSprite= new Sprite();
                spyOn(SpriteSheet, "draw");
                NuevoSprite.draw(ctx)
                expect(SpriteSheet.draw).toHaveBeenCalled();
        });

         it("SpriteSpec setup", function(){
                SpriteSheet = { map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                                enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },},
                                merge: function(){},
                                setup: function(){},
                                };
                var board = new GameBoard();
                enemigo= new Enemy(enemies.basic);
                board.add(enemigo);
                spyOn(enemigo, "merge");
                enemigo.setup(enemies.basic.sprite)
                expect(enemigo.merge).toHaveBeenCalled();
        });
});
