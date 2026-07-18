import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {

    const navigate = useNavigate();

    const login = useAuthStore(state => state.login);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            await login({
                email,
                password
            });

            navigate("/dashboard");

        } catch {

            alert("Invalid credentials");

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

                <h1>AetherMind</h1>

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

                    Login

                </button>

                <p>

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}