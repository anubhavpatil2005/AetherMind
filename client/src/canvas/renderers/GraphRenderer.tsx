import { useState } from "react";

import Node from "../Node";
import Edges from "../Edges";
import ContextMenu from "../../components/ContextMenu";

import { useGraphStore } from "../../store/graphStore";

import {
    createChildNode,
    deleteNode
} from "../../api/nodeApi";

export default function GraphRenderer() {

    const {

        nodes,

        edges,

        moveNode,

        saveNode,

        updateNodeTitle,

        addNode,

        addEdge,

        removeNode,

        removeEdgesByNode

    } = useGraphStore();

    const [menu, setMenu] = useState({

        visible: false,

        nodeId: 0,

        x: 0,

        y: 0

    });

    function closeMenu() {

        setMenu({

            visible: false,

            nodeId: 0,

            x: 0,

            y: 0

        });

    }

    function openContextMenu(

        id: number,

        x: number,

        y: number

    ) {

        setMenu({

            visible: true,

            nodeId: id,

            x,

            y

        });

    }

    async function handleAddChild() {

        try {

            const result = await createChildNode(

                menu.nodeId

            );

            addNode(result.node);

            addEdge(result.edge);

        }

        catch (err) {

            console.error(err);

            alert("Unable to create child node.");

        }

        closeMenu();

    }

    async function handleDelete() {

        try {

            await deleteNode(

                menu.nodeId

            );

            removeNode(

                menu.nodeId

            );

            removeEdgesByNode(

                menu.nodeId

            );

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete node.");

        }

        closeMenu();

    }

    function handleRename() {

        console.log(

            "Rename",

            menu.nodeId

        );

        closeMenu();

    }

    function handleExpandAI() {

        console.log(

            "Expand AI",

            menu.nodeId

        );

        closeMenu();

    }

    function handleDuplicate() {

        console.log(

            "Duplicate",

            menu.nodeId

        );

        closeMenu();

    }

    function handleColor() {

        console.log(

            "Color",

            menu.nodeId

        );

        closeMenu();

    }

    return (

        <>

            <Edges

                nodes={nodes}

                edges={edges}

            />

            {

                nodes.map((node) => (

                    <Node

                        key={node.id}

                        id={node.id}

                        title={node.title}

                        x={node.x}

                        y={node.y}

                        onMove={moveNode}

                        onSave={saveNode}

                        onTitleChange={updateNodeTitle}

                        onContextMenu={openContextMenu}

                    />

                ))

            }

            <ContextMenu

                visible={menu.visible}

                x={menu.x}

                y={menu.y}

                onClose={closeMenu}

                onAddChild={handleAddChild}

                onRename={handleRename}

                onDelete={handleDelete}

                onExpandAI={handleExpandAI}

                onDuplicate={handleDuplicate}

                onColor={handleColor}

            />

        </>

    );

}