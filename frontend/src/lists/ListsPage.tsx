import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListsPage.css";

type ListPreview = {
  id: string;
  title: string;
  isArchived: boolean;
  isOwner: boolean;
  itemCount: number;
  doneCount: number;
};

const INITIAL_LISTS: ListPreview[] = [
  {
    id: "groceries",
    title: "Groceries",
    isArchived: false,
    isOwner: true,
    itemCount: 10,
    doneCount: 6,
  },
  {
    id: "xmas",
    title: "Christmas presents",
    isArchived: false,
    isOwner: true,
    itemCount: 5,
    doneCount: 1,
  },
  {
    id: "terrace",
    title: "Terrace renovation",
    isArchived: false,
    isOwner: false,
    itemCount: 8,
    doneCount: 3,
  },
  {
    id: "old",
    title: "Old shopping list",
    isArchived: true,
    isOwner: true,
    itemCount: 7,
    doneCount: 7,
  },
];

type FilterMode = "active" | "all";

type TempItem = { name: string; qty: string };
type TempMember = { name: string };

const ListsPage: React.FC = () => {
  const [lists, setLists] = useState<ListPreview[]>(INITIAL_LISTS);
  const [filter, setFilter] = useState<FilterMode>("active");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // fields v modalu
  const [newTitle, setNewTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [tempItems, setTempItems] = useState<TempItem[]>([]);
  const [memberName, setMemberName] = useState("");
  const [tempMembers, setTempMembers] = useState<TempMember[]>([]);

  const navigate = useNavigate();

  const visibleLists =
    filter === "active" ? lists.filter((l) => !l.isArchived) : lists;

  const myLists = visibleLists.filter((l) => l.isOwner);
  const sharedLists = visibleLists.filter((l) => !l.isOwner);

  const handleOpenList = (id: string) => {
    navigate(`/lists/${id}`);
  };

  const handleDelete = (id: string) => {
    const list = lists.find((l) => l.id === id);
    if (!list || !list.isOwner) return;
    if (!window.confirm("Delete this list?")) return;
    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  // ---- modal helpers ----
  const resetModalState = () => {
    setNewTitle("");
    setItemName("");
    setItemQty("");
    setTempItems([]);
    setMemberName("");
    setTempMembers([]);
  };

  const handleAddItemToTemp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!itemName.trim()) return;
    setTempItems((prev) => [
      ...prev,
      { name: itemName.trim(), qty: itemQty.trim() || "1" },
    ]);
    setItemName("");
    setItemQty("");
  };

  const handleRemoveTempItem = (index: number) => {
    setTempItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMemberToTemp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!memberName.trim()) return;
    setTempMembers((prev) => [...prev, { name: memberName.trim() }]);
    setMemberName("");
  };

  const handleRemoveTempMember = (index: number) => {
    setTempMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    const itemCount = tempItems.length;
    const doneCount = 0;

    const newList: ListPreview = {
      id: "l" + Date.now(),
      title,
      isArchived: false,
      isOwner: true,
      itemCount,
      doneCount,
    };

    setLists((prev) => [newList, ...prev]);
    resetModalState();
    setIsAddOpen(false);
  };

  const handleCloseModal = () => {
    resetModalState();
    setIsAddOpen(false);
  };

  return (
    <div className="lists-page">
      <div className="lists-shell">
        <div className="lists-card">
          <div className="lists-header-row">
            <h1 className="lists-title">My lists</h1>

            <button
                className="logout-chip"
                type="button"
                onClick={() => navigate("/")}
            >
                Logout
            </button>
          </div>
          {/* filtr jako v detailu */}
          <div className="lists-filter-row">
            <span className="lists-filter-label">Show:</span>
            <div className="lists-filter-buttons">
              <button
                type="button"
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active only
              </button>
              <button
                type="button"
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                Active + archived
              </button>
            </div>
          </div>

          {/* moje listy */}
          <section className="lists-section">
            {myLists.map((list) => {
              const progress =
                list.itemCount === 0
                  ? 0
                  : Math.round((list.doneCount / list.itemCount) * 100);

              return (
                <div key={list.id} className="lists-tile">
                  <button
                    className="lists-tile-button"
                    type="button"
                    onClick={() => handleOpenList(list.id)}
                  >
                    <div className="lists-tile-title-row">
                      <span>{list.title}</span>
                    </div>

                    <div className="lists-tile-meta">
                      {list.isArchived && (
                        <span className="lists-badge-archived">Archived</span>
                      )}
                      <span className="lists-progress-text">
                        {progress}% done
                      </span>
                    </div>
                  </button>

                  {/* mazat může jen owner */}
                  {list.isOwner && (
                    <button
                      type="button"
                      className="lists-tile-delete"
                      onClick={() => handleDelete(list.id)}
                      title="Delete list"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}

            {myLists.length === 0 && (
              <p className="lists-empty">You don&apos;t have any lists yet.</p>
            )}
          </section>

          {/* sdílené listy */}
          {sharedLists.length > 0 && (
            <>
              <p className="lists-shared-label">Shared lists:</p>
              <section className="lists-section">
                {sharedLists.map((list) => {
                  const progress =
                    list.itemCount === 0
                      ? 0
                      : Math.round((list.doneCount / list.itemCount) * 100);

                  return (
                    <div key={list.id} className="lists-tile">
                      <button
                        className="lists-tile-button"
                        type="button"
                        onClick={() => handleOpenList(list.id)}
                      >
                        <div className="lists-tile-title-row">
                          <span>{list.title}</span>
                        </div>
                        <div className="lists-tile-meta">
                          {list.isArchived && (
                            <span className="lists-badge-archived">
                              Archived
                            </span>
                          )}
                          <span className="lists-progress-text">
                            {progress}% done
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </section>
            </>
          )}

          {/* velké tlačítko dole */}
          <button
            className="lists-create-btn"
            type="button"
            onClick={() => setIsAddOpen(true)}
          >
            Create a new list
          </button>
        </div>
      </div>

      {/* modal na nový list – full-screen overlay */}
      {isAddOpen && (
        <div className="lists-modal-backdrop">
          <div className="lists-modal">
            <h2>Create new list</h2>
            <form onSubmit={handleAddSubmit} className="lists-modal-form">
              {/* název */}
              <label>
                Name*
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Weekend groceries"
                  required
                />
              </label>

              {/* items */}
              <div className="lists-modal-group">
                <div className="lists-modal-group-header">
                  <span>Items (optional)</span>
                </div>
                <div className="lists-modal-inline">
                  <input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Item name"
                  />
                  <input
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                    placeholder="Amount"
                    className="lists-modal-qty"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItemToTemp()}
                    className="lists-modal-addbtn"
                  >
                    +
                  </button>
                </div>
                {tempItems.length > 0 && (
                  <ul className="lists-modal-tags">
                    {tempItems.map((it, index) => (
                        <li key={index}>
                            <span className="lists-tag-name">{it.name}</span>
                            <span className="lists-tag-qty">{it.qty}</span>
                            <button
                            type="button"
                            onClick={() => handleRemoveTempItem(index)}
                            >
                            ×
                            </button>
                        </li>
                        ))}
                    </ul>
                )}

              </div>

              {/* members */}
              <div className="lists-modal-group">
                <div className="lists-modal-group-header">
                  <span>Members (optional)</span>
                </div>
                <div className="lists-modal-inline">
                  <input
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Member name"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddMemberToTemp()}
                    className="lists-modal-addbtn"
                  >
                    +
                  </button>
                </div>
                {tempMembers.length > 0 && (
                  <ul className="lists-modal-tags">
                    {tempMembers.map((m, index) => (
                      <li key={index}>
                        {m.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTempMember(index)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="lists-modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="lists-modal-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="lists-modal-confirm">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListsPage;
