

function Footer() {
  return (
      <footer className="mt-12 p-6 bg-purple-600 text-center rounded-t-lg shadow-lg">
        <p>Follow us on Instagram: <a href="https://instagram.com/tanzo-gifts" className="underline">@tanzo_gifts</a></p>
        <p>Contact us on WhatsApp: <a href="https://wa.me/7904329569" className="underline">7904329569</a></p>
        <p className="mt-4">&copy; {new Date().getFullYear()} Tanzo Gifts</p>
      </footer>
  )
}

export default Footer