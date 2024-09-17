const fs = require('fs')
const path = require('path')

const cwd = process.cwd()
const pkgJsonPath = path.resolve(cwd, 'package.json')

function getPackageJSON() {
  if (!fs.existsSync(pkgJsonPath)) {
    console.error(`package.json could not be found at ${pkgJsonPath}`)
    process.exit(1)
  }

  const pkg = fs.readFileSync(pkgJsonPath, 'utf8')
  return JSON.parse(pkg)
}

function generateMetadata() {
  const pkg = getPackageJSON()
  const filePath = path.resolve(cwd, 'src', 'metadata.ts')
  const fileContents = `
  interface Metadata {
    version: string
    description: string
    name: string
  }
  const metadata: Metadata = {
    version: "${pkg.version}",
    description: "${pkg.description}",
    name: "${pkg.name}",
  }

  export default metadata
  `
  fs.writeFileSync(filePath, fileContents, 'utf8')
}

generateMetadata()
