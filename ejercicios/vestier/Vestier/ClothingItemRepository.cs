using System.Collections.Generic;

namespace Vestier
{

    public class ClothingItemRepository
    {
        private readonly List<ClothingItem> _items = new();

        public void Save(ClothingItem item)
        {
            _items.Add(item);
        }

        public IReadOnlyList<ClothingItem> GetAll() => _items;
    }
}
