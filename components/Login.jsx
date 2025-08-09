export default function Login(){
    return(
        <div className="login">
            <h2>Login</h2>
            <input placeholder="Email" type="email" />
            <input placeholder="password" type="password" />
            <button>Submit</button>
            <div className="full-line" />
            <div>
                <p>Don&apos; have an account?</p>
                <button>Sign up</button>
            </div>

        </div>
    )
}