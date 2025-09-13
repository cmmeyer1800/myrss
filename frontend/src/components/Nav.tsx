import { useState } from "react"
import { SatelliteDish } from 'lucide-react';

export default function Nav() {
    const [burgetOpen, setBurgerOpen] = useState(false)

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <strong>MyRSS</strong>
            </a>
            <a role="button" className={`navbar-burger ${burgetOpen ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasic" onClick={() => setBurgerOpen(!burgetOpen)}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            </div>

            <div id={`navbarBasic ${burgetOpen ? 'is-active' : ''}`} className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href="#">About</a>
                    <a className="navbar-item" href="#">Contact</a>
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <SatelliteDish />
                </div>
            </div>
        </nav>
    )
}