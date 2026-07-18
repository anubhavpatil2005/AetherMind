import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Register() {

    const navigate = useNavigate();

    const register = useAuthStore(
        state => state.register
    );

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            await register({
                name,
                email,
                password
            });

            navigate("/dashboard");

        } catch {

            alert("Registration failed");

        }

    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <form
                onSubmit={handleSubmit}
            >

                <h1>Create Account</h1>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />

                <button>

                    Register

                </button>

                <p>

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}