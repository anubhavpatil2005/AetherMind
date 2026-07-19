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

            {/* Cards */}

            {

                !loading && maps.length > 0 && (

                    <div

                        style={{

                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(320px, 1fr))",

                            gap: 25

                        }}

                    >

                        {

                            maps.map((map) => (

                                <MindMapCard

                                    key={map.id}

                                    map={map}

                                    onDelete={() => handleDelete(map.id)}

                                />

                            ))

                        }

                    </div>

                )

            }

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