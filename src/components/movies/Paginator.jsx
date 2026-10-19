import { Pagination } from 'react-bootstrap';

// Page numbers to show: first, last, and a window around the current page, with gaps as null.
const pageItems = (page, totalPages, spread = 1) => {
    const pages = new Set([1, totalPages]);
    for (let p = page - spread; p <= page + spread; p += 1) {
        if (p > 1 && p < totalPages) pages.add(p);
    }
    const sorted = [...pages].sort((a, b) => a - b);
    return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p]));
};

const Paginator = ({ page, totalPages, onChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Movie pages" className="d-flex justify-content-center mt-4">
            <Pagination className="mb-0 flex-wrap justify-content-center">
                <Pagination.Prev disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page" />
                {pageItems(page, totalPages).map((p, i) =>
                    p === null ? (
                        <Pagination.Ellipsis key={`gap-${i}`} disabled />
                    ) : (
                        <Pagination.Item
                            key={p}
                            active={p === page}
                            onClick={() => onChange(p)}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? 'page' : undefined}
                        >
                            {p}
                        </Pagination.Item>
                    )
                )}
                <Pagination.Next disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Next page" />
            </Pagination>
        </nav>
    );
};

export default Paginator;
