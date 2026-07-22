import { useState } from "react";

import Node from "../Node";
import Edges from "../Edges";

import ContextMenu from "../../components/ContextMenu";
import ColorPicker from "../../components/ColorPicker";
import SearchBar from "../../components/SearchBar";
import KeyboardShortcuts from "../../components/KeyboardShortcuts";
import { useGraphStore } from "../../store/graphStore";
import { useRef } from "react";
import { exportGraphAsPNG } from "../../utils/exportGraph";


import {

    createChildNode,

    deleteNode,

    duplicateNode,

    expandNodeAI,

    updateNode

} from "../../api/nodeApi";

export default function GraphRenderer() {

    const {

        nodes,

        edges,

        selectedNode,

        search,

        moveNode,

        saveNode,

        updateNodeTitle,

        updateNodeLocal,

        addNode,

        addEdge,

        removeNode,

        removeEdgesByNode,

        selectNode,

        setSearch

    } = useGraphStore();

    const [menu, setMenu] = useState({

        visible: false,

        nodeId: 0,

        x: 0,

        y: 0

    });

    const graphRef = useRef<HTMLDivElement>(null);

    const [colorPicker, setColorPicker] = useState({

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

        const node = nodes.find(

            (n) => n.id === id

        );

        selectNode(node ?? null);

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

            selectNode(null);

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete node.");

        }

        closeMenu();

    }

    async function handleDuplicate() {

        try {

            const node = await duplicateNode(

                menu.nodeId

            );

            addNode(node);

        }

        catch (err) {

            console.error(err);

            alert("Unable to duplicate node.");

        }

        closeMenu();

    }

    async function handleExpandAI() {

        try {

            const result = await expandNodeAI(

                menu.nodeId

            );

            result.nodes.forEach(

                (node: any) =>

                    addNode(node)

            );

            result.edges.forEach(

                (edge: any) =>

                    addEdge(edge)

            );

        }

        catch (err) {

            console.error(err);

            alert("AI Expansion Failed");

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

    function handleColor() {

        setColorPicker({

            visible: true,

            nodeId: menu.nodeId,

            x: menu.x + 250,

            y: menu.y

        });

        closeMenu();

    }

    async function handleColorSelected(

        color: string

    ) {

        const node = nodes.find(

            (n) =>

                n.id === colorPicker.nodeId

        );

        if (!node) return;

        updateNodeLocal(

            node.id,

            {

                color

            }

        );

        try {

            await updateNode(

                node.id,

                {

                    title: node.title,

                    description: node.description,

                    type: node.type,

                    x: node.x,

                    y: node.y,

                    color

                }

            );

        }

        catch (err) {

            console.error(err);

            alert("Failed to update color.");

        }

    }
return (

    <>

        <KeyboardShortcuts />

        <SearchBar

            onSearch={setSearch}

        />

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

                    color={node.color}

                    x={node.x}

                    y={node.y}

                    selected={

                        selectedNode?.id === node.id

                    }

                    highlight={

                        search.length > 0 &&

                        node.title

                            .toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                    }

                    onSelect={(id) => {

                        const found = nodes.find(

                            (n) => n.id === id

                        );

                        selectNode(

                            found ?? null

                        );

                    }}

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

            onColor={handleColor}

            onDuplicate={handleDuplicate}

            onExpandAI={handleExpandAI}

            onDelete={handleDelete}

        />

        <ColorPicker

            visible={colorPicker.visible}

            x={colorPicker.x}

            y={colorPicker.y}

            onClose={() =>

                setColorPicker({

                    ...colorPicker,

                    visible: false

                })

            }

            onSelect={handleColorSelected}

        />

    </>

);

}    