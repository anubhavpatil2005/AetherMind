export class CameraEngine {

    x = 0;

    y = 0;

    zoom = 1;

    move(dx: number, dy: number) {

        this.x += dx;

        this.y += dy;

    }

    setZoom(value: number) {

        this.zoom = Math.max(
            0.2,
            Math.min(value, 3)
        );

    }

}