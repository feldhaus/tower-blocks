import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  OrthographicCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

export class Stage {
  private container: HTMLElement;
  private camera: OrthographicCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;

  constructor() {
    this.container = document.getElementById('game');
    this.scene = new Scene();

    this.setupRenderer();
    this.setupCamera();
    this.setupLights();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public resize(width: number, height: number) {
    this.renderer.setSize(width, height);
  }

  public add(object: Object3D) {
    this.scene.add(object);
  }

  public remove(object: Object3D) {
    this.scene.remove(object);
  }

  private setupRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this.renderer.setClearColor('#D0CBC7', 1);
    this.container.appendChild(this.renderer.domElement);
  }

  private setupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustum = 20;
    this.camera = new OrthographicCamera(
      -frustum * aspect,
      frustum * aspect,
      frustum,
      -frustum,
      -100,
      1000,
    );
    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = 2;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }

  private setupLights() {
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 500, 0);
    this.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.4);
    this.add(ambientLight);
  }
}