session_store = {}


def get_session_filters(session_id: str):
    return session_store.get(session_id, {}).copy()


def update_session_filters(session_id: str, new_filters: dict):
    existing = session_store.get(session_id, {})
    existing.update(new_filters)
    session_store[session_id] = existing
    return existing