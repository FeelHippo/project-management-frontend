export default function GradientBackground() {
    return (
        <div
            className="flex"
        >
            {
                gradients.map((gradient, i) =>
                    <div
                        key={i.toString()}
                        className="inline min-w-1/28 w-1/28 min-h-full h-full bg-linear-to-r from-blue-600 to-blue-500 z-0"
                        style={{ minHeight: "100vh" }}
                    >
                        {
                            !!gradient &&
                            < div
                                className={`block min-w-1/28 w-1/28 bg-linear-to-b from-transparent ${gradient?.via} to-transparent z-10`}
                                style={{ minHeight: gradient?.minHeight, minWidth: "100%", marginTop: gradient?.marginTop }}
                            ></div>
                        }
                    </div>
                )
            }
        </div>
    );
}

const gradients = [
    null, null, null,
    {
        minHeight: "75vh",
        marginTop: "10vh",
        via: "via-purple-500",
    },
    {
        minHeight: "100vh",
        marginTop: "0vh",
        via: "via-fuchsia-400",
    },
    {
        minHeight: "110vh",
        marginTop: "0vh",
        via: "via-pink-500",
    },
    {
        minHeight: "100vh",
        marginTop: "5vh",
        via: "via-orange-500",
    },
    {
        minHeight: "100vh",
        marginTop: "5vh",
        via: "via-yellow-500",
    },
    {
        minHeight: "105vh",
        marginTop: "10vh",
        via: "via-yellow-400",
    },
    {
        minHeight: "110vh",
        marginTop: "33vh",
        via: "via-pink-500",
    },
    {
        minHeight: "100vh",
        marginTop: "36vh",
        via: "via-orange-500",
    },
    {
        minHeight: "100vh",
        marginTop: "39vh",
        via: "via-yellow-500",
    },
    {
        minHeight: "105vh",
        marginTop: "42vh",
        via: "via-yellow-400",
    },
    {
        minHeight: "105vh",
        marginTop: "45vh",
        via: "via-yellow-300",
    },
];
