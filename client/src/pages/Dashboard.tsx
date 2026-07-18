import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMindMaps,
    deleteMindMap
} from "../api/mindmapApi";

import CreateMindMapModal from "../components/CreateMindMapModal";
import MindMapCard from "../components/MindMapCard";

interface MindMap {

    id: number;

    title: string;

    description: string;

    created_at: string;

}

export default function Dashboard() {

    const navigate = useNavigate();

    const [maps, setMaps] = useState<MindMap[]>([]);

    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        loadMaps();

    }, []);

    async function loadMaps() {

        try {

            setLoading(true);

            const data = await getMindMaps();

            console.log("MindMaps:", data);

            setMaps(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id: number) {

        const confirmDelete = window.confirm(
            "Delete this mind map?"
        );

        if (!confirmDelete) return;

        try {

            await deleteMindMap(id);

            loadMaps();

        } catch (err) {

            console.error(err);

            alert("Failed to delete.");

        }

    }

    return (

        <div

            style={{

                minHeight: "100vh",

                background: "#0F172A",

                color: "white",

                padding: "40px"

            }}

        >

            {/* Header */}

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    marginBottom: 50

                }}

            >

                <h1

                    style={{

                        fontSize: 40,

                        margin: 0

                    }}

                >

                    AetherMind

                </h1>

                <button

                    onClick={() => setOpenModal(true)}

                    style={{

                        padding: "12px 20px",

                        background: "#3B82F6",

                        color: "white",

                        border: "none",

                        borderRadius: 8,

                        cursor: "pointer",

                        fontWeight: 600

                    }}

                >

                    + New Mind Map

                </button>

            </div>

            {/* Loading */}

            {

                loading && (

                    <div

                        style={{

                            textAlign: "center",

                            marginTop: 80,

                            fontSize: 20

                        }}

                    >

                        Loading...

                    </div>

                )

            }

            {/* Empty State */}

            {

                !loading && maps.length === 0 && (

                    <div

                        style={{

                            textAlign: "center",

                            marginTop: 120,

                            color: "#94A3B8"

                        }}

                    >

                        <h2>No Mind Maps Found</h2>

                        <p>

                            Click

                            {" "}

                            <strong>

                                + New Mind Map

                            </strong>

                            {" "}

                            to create your first AI knowledge graph.

                        </p>

                    </div>

                )

            }

            {/* Cards */}

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns:

                        "repeat(auto-fill,minmax(320px,1fr))",

                    gap: 25

                }}

            >

                {

                    maps.map((map) => (

                        <div

                            key={map.id}

                            style={{

                                background: "#1E293B",

                                borderRadius: 16,

                                padding: 24,

                                border: "1px solid #334155",

                                boxShadow:

                                    "0 10px 30px rgba(0,0,0,.2)"

                            }}

                        >

                            <h2>

                                {map.title}

                            </h2>

                            <p

                                style={{

                                    color: "#CBD5E1",

                                    minHeight: 60

                                }}

                            >

                                {

                                    map.description ||

                                    "No description."

                                }

                            </p>

                            <small

                                style={{

                                    color: "#94A3B8"

                                }}

                            >

                                Created:

                                {" "}

                                {

                                    new Date(

                                        map.created_at

                                    ).toLocaleDateString()

                                }

                            </small>

                            <div

                                style={{

                                    marginTop: 20,

                                    display: "flex",

                                    gap: 12

                                }}

                            >

                                <button

                                    onClick={() =>

                                        navigate(

                                            `/mindmap/${map.id}`

                                        )

                                    }

                                    style={{

                                        flex: 1,

                                        padding: 10,

                                        background: "#2563EB",

                                        color: "white",

                                        border: "none",

                                        borderRadius: 8,

                                        cursor: "pointer"

                                    }}

                                >

                                    Open

                                </button>

                                <button

                                    onClick={() =>

                                        handleDelete(

                                            map.id

                                        )

                                    }

                                    style={{

                                        flex: 1,

                                        padding: 10,

                                        background: "#DC2626",

                                        color: "white",

                                        border: "none",

                                        borderRadius: 8,

                                        cursor: "pointer"

                                    }}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

            <CreateMindMapModal

                open={openModal}

                onClose={() =>

                    setOpenModal(false)

                }

                onCreated={loadMaps}

            />

        </div>

    );

}