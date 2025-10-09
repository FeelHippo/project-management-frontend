import React from "react";
import {Main} from "next/document";

export default function HomeLayout(
    {children}: {
        children: React.ReactNode
    },
) {
    return (
        <section>{children}</section>
    )
}