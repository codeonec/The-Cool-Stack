import Link from "next/link";

export default function Header(){
    return(
        <div className="navbar-main">
            <div className="wrapper">
                <div className="brand"><Link href="/">HighOnCode</Link></div>
                <strong>By Codeonec</strong>
            </div>
        </div>
    )
}