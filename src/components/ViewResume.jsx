import { useSearchParams } from "react-router-dom"

export default function ViewResume() {
    const [searchParams] = useSearchParams()

    const resumeUrl = searchParams.get("resume")

    return (
        <div style={{ height: "100vh" }}>
            <iframe src={resumeUrl} title="PDF Viewer" width="100%" height="100%" style={{ border: "none" }} />
        </div>
    )
}