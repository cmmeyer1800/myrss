import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

export default function Expand({children}:{children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button className="button" onClick={() => setIsOpen(!isOpen)}>
                <span className="icon is-small">
                    {isOpen ? <ChevronUpIcon className="icon" /> : <ChevronDownIcon className="icon" />}
                </span>
            </button>
            {isOpen && children}
        </div>
    )
}