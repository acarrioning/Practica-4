/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/


describe("GameBoard", function(){
  
   var canvas, ctx;
   var board;
 //gameBoard;

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

        it("GameBoard.add()", function(){
               //Creo un objeto y lo añado al tablero
               var objetoVacio= {};
               var objeto2= board.add(objetoVacio);
               expect(board.objects[0]).toBe(objetoVacio);//El objeto añadido debería haber sido añadido en la primera posición de objects
               expect(objeto2.board).toBe(board);
        });


        it("GameBoard.removers", function(){
                //Testeamos las funciones remove, resetRemoved y finalizeRemoved a la vez
                spyOn(board, "remove").andCallThrough();
                spyOn(board, "resetRemoved").andCallThrough();
                spyOn(board, "finalizeRemoved").andCallThrough();

                var tester = {};//Variable de prueba

                board.add(tester);//Añadimos la variable de prueba al tablero
                board.resetRemoved();//Ponemos a ceros la lista de objetos pendientes de ser borrados                
                board.remove(tester);//Borramos un objeto (Debería pasar a la lista de objetos pendientes de ser borrados)
                expect(board.removed.length).toBe(1);//Comprobamos que la lista de obj pendientes tenga un objeto (El que hemos borrado)
                board.finalizeRemoved();//Esto debría volver a dejar la lista de objetos pendientes vacía
                expect(board.objects.length).toBe(0);//Comprobamos que dicha lista esta vacía
                board.resetRemoved();
                expect(board.removed.length).toBe(0);
         });


        it("GameBoard.iterate", function(){
                var test = {draw : function(){},step: function(){}};//Obejto de prueba

                board.add(test);//Añadimos el objeto al tablero
                //espías
                spyOn(test, "draw");
                spyOn(test, "step");

                board.iterate("draw",10);
                board.iterate("step",10);
                //Comprobamos si iterate ha llamado a step y draw con el argumento que le hemos pasado
                expect(test.draw).toHaveBeenCalledWith(10);
                expect(test.step).toHaveBeenCalledWith(10);
        });


        it("GameBoard.detect", function(){
                //Creamos una funcion de prueba que nos determina si un valo es igual a un num concreto o no 
                var testing= function(){
                        return!(this.num === 1); //Esto devuelve un Booleano                        
                };

                //Definimos variables auxiliares y las añadimos al tablero
                var test_falso = {num : 1};
                var test_cierto = {num : 2};
                
                board.add(test_falso);
                board.add(test_cierto);
                
                //Llamamos a detect
                var detectado = board.detect(testing);

                expect(detectado).toBe(test_cierto);//Comprobamos que detect funciona correctamente
                 
        });

	it("GameBoard.step()", function(){
                var test = {};
                //Espiamos las funciones a las que llama step
                spyOn(board,"resetRemoved");
                spyOn(board,"iterate");
                spyOn(board,"finalizeRemoved");
                //Le pasamos un objeto vacío a step y vemos si llama a las funciones que tiene dentro
                board.step(test);
                //Si step funciona bien o no depende de si las funciones a las que llama funcionan correctamente
                expect(board.resetRemoved).toHaveBeenCalled();
                expect(board.iterate).toHaveBeenCalled();
                expect(board.finalizeRemoved).toHaveBeenCalled();
        });


        it("GameBoard.draw()", function(){
                var tester = {};
                //Simplemente le pasamos un objeto a draw y vemos si la función iterarte es llamada 
                spyOn(board,"iterate");

                board.draw(tester);

                expect(board.iterate).toHaveBeenCalled();//Si es llamada, el correcto funcionamiento dependerá de iterate
        });
 

        it("GameBoard.overlap", function(){
               var referenceObject = {x: 0, y: 0, w: 10, h:10};//Objeto de referencia
               var collideObject = {x: 4, y: 5, w: 10, h:10};//Objeto que se solapa con el de referencia
               var noCollideObject = {x: 15, y: 15, w: 10, h:10};//Objeto que NO se solapa con el de referencia
            
               //Compruebo el funcionamiento de overlap               
               expect(board.overlap(referenceObject, collideObject)).toEqual(true);//Se solapan         
               expect(board.overlap(referenceObject, noCollideObject)).toEqual(false);//No se solapan


        });


        it("GameBoard.collide", function(){
               var referenceObject = {x: 0, y: 0, w: 10, h:10, type:0};//Objeto de referencia
               var collideObject = {x: 4, y: 5, w: 10, h:10, type:2};//Objeto que colisiona con el de referencia
               var noCollideObject = {x: 15, y: 15, w: 10, h:10, type:4};//Objeto que NO colisiona con el de referencia
               //var collideObject2 = {x: 4, y: 5, w: 10, h:10, type:0}; comprobar como funciona type

               //Añadimos los objetos al tablero
               board.add(referenceObject);
               board.add(collideObject);
               board.add(noCollideObject);

               expect(board.collide(referenceObject, collideObject.type)).toBe(collideObject);//Collide tiene que devolver true
               expect(board.collide(referenceObject, noCollideObject.type)).toBe(false);//Collide debería devolver false
               //expect(board.collide(referenceObject, collideObject2.type)).toBe(false); comprobar como funciona type
        });

});

