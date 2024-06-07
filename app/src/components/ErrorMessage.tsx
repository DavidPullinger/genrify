export default function (props: { error: string }) {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl bg-primary text-white p-2 rounded-lg">{props.error}</p>
        </div>
    );
}
