import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export async function exportGraphAsPNG(

    element: HTMLElement

) {

    const dataUrl = await toPng(

        element,

        {

            cacheBust: true,

            backgroundColor: "#0F172A",

            pixelRatio: 2

        }

    );

    saveAs(

        dataUrl,

        "AetherMind.png"

    );

}