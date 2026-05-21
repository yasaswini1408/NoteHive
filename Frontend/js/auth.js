const API = 'https://notehive-qi1d.onrender.com'

function showSignup() {
    document.getElementById('loginForm').style.display = 'none'
    document.getElementById('signupForm').style.display = 'block'
    document.getElementById('subtitle').textContent = 'Create your account'
    hideError()
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none'
    document.getElementById('loginForm').style.display = 'block'
    document.getElementById('subtitle').textContent = 'Sign in to your account'
    hideError()
}

function showError(msg) {
    const el = document.getElementById('errorMsg')
    el.textContent = msg
    el.style.display = 'block'
}

function hideError() {
    document.getElementById('errorMsg').style.display = 'none'
}

async function login() {
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value

    if (!email || !password) {
        showError('Please fill in all fields')
        return
    }

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            const msg = await res.text()
            showError(msg)
            return
        }

        const data = await res.json()
        localStorage.setItem('token', data.token)
        window.location.href = 'notes.html'

    } catch (err) {
        showError('Something went wrong. Is the server running?')
    }
}

async function signup() {
    const name = document.getElementById('signupName').value
    const email = document.getElementById('signupEmail').value
    const password = document.getElementById('signupPassword').value

    if (!name || !email || !password) {
        showError('Please fill in all fields')
        return
    }

    try {
        const res = await fetch(`${API}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        if (!res.ok) {
            const msg = await res.text()
            showError(msg)
            return
        }

        showLogin()
        alert('Account created! Please login.')

    } catch (err) {
        showError('Something went wrong. Is the server running?')
    }
}