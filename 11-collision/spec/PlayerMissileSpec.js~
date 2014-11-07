/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/


describe("Clase PlayerMissile", function(){


    beforeEach(function(){
	
	loadFixtures('index.html');       
	canvas = $('#game')[0];
	expect(canvas).toExist();
	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
        oldGame = Game;
        board= new GameBoard();
        
	//gameBoard = new GameBoard();
       
        
    });

    afterEach(function(){
       Game = oldGame;
    });


    it("PlayerMissile Constructor", function(){
        SpriteSheet.map = {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } };
        test_missile = new PlayerMissile(1,1);
        expect(test_missile.w).toBe(SpriteSheet.map['missile'].w);
        expect(test_missile.h).toBe(SpriteSheet.map['missile'].h);
        expect(test_missile.x).toBe(1 - test_missile.w/2);
        expect(test_missile.y).toBe(1 - test_missile.h);
        expect(test_missile.vy).toBe(-700);
    });


    it("PlayerMissile.draw", function(){
        SpriteSheet = { draw:function(){},map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }} };
        var test  = {};
        test_missile = new PlayerMissile(1,1);
        spyOn(SpriteSheet, "draw");
        test_missile.draw(test);
        expect(SpriteSheet.draw).toHaveBeenCalled();
    });

    


        it("PlayerMissile.step", function() {
                SpriteSheet = { step:function(){},map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }} };
                test_missil = new PlayerMissile(1, 1);
                var test = test_missil.y;
                var num = -10;
                var board = {remove: function(){}};
                test_missil.board = board;
                spyOn(board, "remove");
                test_missil.step(num);
                expect(test_missil.y).toBe(test + test_missil.vy*num);
                expect(board.remove).not.toHaveBeenCalled();
                test_missil.step(1+(-test_missil.h-test_missil.y)/test_missil.vy);
                expect(board.remove).toHaveBeenCalledWith(test_missil);
        });


});




