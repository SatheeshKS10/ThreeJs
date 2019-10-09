var camera, scene, renderer;
var boxGeometry;

var objects = [];
var positionValues = ["7.4978", "-7.4628", "-39.8558", "-3.2176", "-7.4472", "-39.9980"];

init();
animate();
printPosition();

function init() {

    //camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(100, 0, 0);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.position.z = 1;

    scene = new THREE.Scene();
    loadTruckModel();
    // load image
    // var texture  = new THREE.TextureLoader().load('https://raw.githubusercontent.com/SatheeshKS10/MockRest/master/truck-front.png');

    //var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    boxGeometry = new THREE.BoxGeometry(25, 25, 90, 7, 7, 7);
    // var material = new THREE.MeshBasicMaterial({map:texture, color: "#000000", wireframe:true});
    //( { map: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/SatheeshKS10/MockRest/master/truck-front.png' ) } )
    var material = [
      new THREE.MeshBasicMaterial({ color: "#000000", wireframe:true}),
      new THREE.MeshBasicMaterial({ color: "#000000", wireframe:true}),
      new THREE.MeshBasicMaterial({ color: "#000000", wireframe:true}),
      new THREE.MeshBasicMaterial({ color: "#666699", wireframe:false}),
	  // load 3D truck model to the mesh here, instead of the image
      new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/SatheeshKS10/MockRest/master/truck-front.png'), wireframe:false } ),
      new THREE.MeshBasicMaterial({ color: "#000000", wireframe:true})
  ];
    // load 3d truck engine model
        
    var mesh = new THREE.Mesh( boxGeometry, material );
    mesh.material.side = THREE.BackSide;
    scene.add( mesh );
   // objects.push( mesh );
    
    // create multiple cube pallets 
    var color = "#ff3300";
    var palletsMesh, palletMaterial, cubes, n=0;
    for(var i=0;i<2; i++){
        cubes = new THREE.BoxGeometry(10,10,10);
        palletMaterial = new THREE.MeshBasicMaterial({color:color});
        palletsMesh = new THREE.Mesh(cubes, palletMaterial);
        palletsMesh.position.x = positionValues[n++];
        palletsMesh.position.y = positionValues[n++];
        palletsMesh.position.z = positionValues[n++];
        //add the pallets to screen and objects
        scene.add(palletsMesh);
        objects.push(palletsMesh);
        color = "#6699ff";
    }

    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor(0xcce0ff);
    document.body.appendChild( renderer.domElement );
		
		const orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
		
		const dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
		dragControls.addEventListener( 'dragstart', function () { orbitControls.enabled = false; } );
		dragControls.addEventListener( 'dragend', function () { orbitControls.enabled = true; } );

}

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}

function printPosition(){
   for(var i=0;i<objects.length;i++){
     
     console.log("pallets position : "+objects[i].position.x +" "+objects[i].position.y+" "+objects[i].position.z);
   }
}

function loadTruckModel(){
  var objectLoader = new THREE.ObjectLoader();
  // json model will be loaded from the local http server, to avoid CORS
  objectLoader.load( "http://localhost:8080/truck.json", function ( obj ) {
    console.log("loaded json model");
     scene.add( obj );
  } );
}
  var palletPosIncr = 0;
  var x, yaxis, z;
  x = yaxis = z = 10; 
  var n = 0;
  function addPallets(){
    var palletsMesh, palletMaterial, cubes;
    var y = -10;
    cubes = new THREE.BoxGeometry(x,yaxis,z);
    color = new THREE.Color( 0xffffff );
    color.setHex( Math.random() * 0xffffff );
    palletMaterial = new THREE.MeshBasicMaterial({color:color});
    palletsMesh = new THREE.Mesh(cubes, palletMaterial);
    palletsMesh.position.y = y+palletPosIncr;
    palletsMesh.position.z = -70;
    scene.add(palletsMesh);
    objects.push(palletsMesh);
    palletPosIncr = 10+palletPosIncr;
    y = 0;
    if(n%2 == 0){
      x = 20;
      yaxis = 10;
    } else {
      yaxis = 20;
      x = 10;
    }
    n++;
  }
