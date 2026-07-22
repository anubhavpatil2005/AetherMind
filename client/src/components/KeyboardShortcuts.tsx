import { useEffect, useRef } from "react";

import {

    duplicateNode,

    deleteNode

} from "../api/nodeApi";

import { useGraphStore } from "../store/graphStore";

export default function KeyboardShortcuts() {

    const {

        selectedNode,

        addNode,

        removeNode,

        removeEdgesByNode,

        selectNode

    } = useGraphStore();

    const copiedNode = useRef<number | null>(null);

    useEffect(() => {

        async function handleKeyDown(

            e: KeyboardEvent

        ) {

            if (!selectedNode) return;

            /* Delete */

            if (e.key === "Delete") {

                e.preventDefault();

                try {

                    await deleteNode(

                        selectedNode.id

                    );

                    removeNode(

                        selectedNode.id

                    );

                    removeEdgesByNode(

                        selectedNode.id

                    );

                    selectNode(null);

                }

                catch (err) {

                    console.error(err);

                }

            }

            /* Copy */

            if (

                e.ctrlKey &&

                e.key.toLowerCase() === "c"

            ) {

                e.preventDefault();

                copiedNode.current =

                    selectedNode.id;

            }

            /* Paste */

            if (

                e.ctrlKey &&

                e.key.toLowerCase() === "v"

            ) {

                e.preventDefault();

                if (!copiedNode.current) return;

                try {

                    const node = await duplicateNode(

                        copiedNode.current

                    );

                    addNode(node);

                }

                catch (err) {

                    console.error(err);

                }

            }

        }

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

    }, [

        selectedNode

    ]);

    return null;

}