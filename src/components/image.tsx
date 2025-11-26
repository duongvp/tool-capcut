import { useState, type ImgHTMLAttributes } from "react";

export interface ImageProps
    extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src: string;
    width?: number | string;
    height?: number | string;
    placeholder?: boolean; // bật blur placeholder
}

export default function Image({
    src,
    alt = "",
    className = "",
    width,
    height,
    placeholder = true, // blur hiệu ứng
    ...props
}: ImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            style={{
                width: width || "auto",
                height: height || "auto",
                overflow: "hidden",
                position: "relative",
            }}
            className={className}
        >
            {/* Placeholder blur */}
            {placeholder && (
                <div
                    style={{
                        filter: "blur(20px)",
                        background: "#f0f0f0",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: loaded ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                />
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    position: "relative",
                }}
                {...props}
            />
        </div>
    );
}
