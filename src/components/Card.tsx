import React from 'react';
import { Card as CardType } from '../types';
import { useDeckStore } from '../store/deckStore';

interface CardProps {
  card: CardType;
  isDraggable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export const Card: React.FC<CardProps> = ({
  card,
  isDraggable = true,
  isSelected = false,
  onSelect,
  onClick,
  onDragStart,
  onDragEnd,
}) => {
  const { decks, activeDeckId } = useDeckStore();
  const activeDeck = decks.find(d => d.id === activeDeckId);

  const getLevelColor = (level: CardType['level']) => {
    switch (level) {
      case 'purple':
        return 'bg-purple-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect();
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (isDraggable && onDragStart) {
      onDragStart(e);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  return (
    <div
      className={`relative w-20 h-28 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
        card.isArchived ? 'opacity-50 grayscale' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className={`h-1.5 ${getLevelColor(card.level)} rounded-t-lg`} />
      <div className="p-1.5">
        <h3 className="text-xs font-medium line-clamp-2 mb-1">{card.name}</h3>
        <p className="text-[10px] text-gray-500 line-clamp-2">{card.description}</p>
        <div className="absolute bottom-1 left-1.5 right-1.5">
          <span className="text-[10px] text-gray-400">{card.category}</span>
        </div>
      </div>
      {!card.isArchived && isSelected && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}; 