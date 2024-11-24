import categories from "../dummy/categories.json"

const Category = () => {
    return (
        <div className="container shadow">
            <div className="row bg-dark gy-2">
                <h5 className="text-white text-center p-2">Thực đơn</h5>
            </div>
            <div className="row pt-3 ps-4">
                {categories.map((job) => (
                    <p>
                        <a class="link-underline link-underline-opacity-0 custom-hover-container" href="#">
                            {job.name}
                        </a>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Category