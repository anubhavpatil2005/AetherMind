import { useState } from "react";
import { createMindMap } from "../api/mindmapApi";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateMindMapModal({
    open,
    onClose,
    onCreated
}: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!open) return null;

    async function handleCreate() {

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        try {

            await createMindMap({
                title,
                description
            });

            setTitle("");
            setDescription("");

            onCreated();
            onClose();

        } catch (err) {

            console.error(err);
            alert("Failed to create mind map");

        }

    }

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999
            }}
        >

            <div
                style={{
                    width: 450,
                    background: "#1E293B",
                    padding: 30,
                    borderRadius: 16
                }}
            >

                <h2>Create Mind Map</h2>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 12,
                        marginTop: 20
                    }}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: "100%",
                        marginTop: 15,
                        padding: 12,
                        height: 100
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 10,
                        marginTop: 20
                    }}
                >

                    <button onClick={onClose}>
                        Cancel
                    </button>

                    <button onClick={handleCreate}>
                        Create
                    </button>

                </div>

            </div>

        </div>

    );

}