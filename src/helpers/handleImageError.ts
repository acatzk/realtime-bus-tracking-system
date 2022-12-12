const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, image: string) => {
  event.currentTarget.src = image
  event.currentTarget.onerror = null
}

export default handleImageError
