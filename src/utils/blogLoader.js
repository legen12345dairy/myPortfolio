// Blog post loader utility
// This will dynamically import markdown files and parse them

export const blogPosts = [
  {
    id: 1,
    slug: 'ios-development-with-swift',
    title: 'iOS Development with Swift',
    date: 'January 15, 2024',
    readTime: 12,
    excerpt: 'A comprehensive guide to getting started with iOS development using Swift. Learn the fundamentals, tools, and best practices for building iOS applications.',
    tags: ['iOS', 'Swift', 'iOS Development', 'Mobile Development'],
    content: `# iOS Development with Swift

Swift is Apple's powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS development. In this guide, we'll explore the fundamentals of iOS development with Swift and help you build your first iOS application.

## What is Swift?

Swift is a modern, safe, and fast programming language developed by Apple. It combines the best features of C and Objective-C while introducing new capabilities that make iOS development more efficient and enjoyable.

## Getting Started

### Prerequisites

1. **Mac Computer**: iOS development requires macOS
2. **Xcode**: Download from the Mac App Store (free)
3. **Apple Developer Account**: Free for development, $99/year for App Store distribution
4. **iOS Device** (optional): For testing on physical devices

### Setting Up Your First Project

1. Open Xcode
2. Create a new project (File → New → Project)
3. Choose "iOS" → "App"
4. Fill in project details:
   - Product Name: YourAppName
   - Team: Your Apple Developer Team
   - Organization Identifier: com.yourname
   - Interface: SwiftUI or Storyboard
   - Language: Swift

## Swift Fundamentals

### Variables and Constants

\`\`\`swift
// Variables (mutable)
var name = "John"
var age: Int = 25

// Constants (immutable)
let pi = 3.14159
let maxUsers: Int = 100
\`\`\`

### Optionals

Swift's optionals handle the absence of a value safely.

\`\`\`swift
var optionalString: String? = "Hello"
optionalString = nil

// Optional binding
if let unwrapped = optionalString {
    print(unwrapped)
}

// Nil coalescing
let value = optionalString ?? "Default"
\`\`\`

### Functions

\`\`\`swift
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

// With external parameter name
func calculateArea(width w: Double, height h: Double) -> Double {
    return w * h
}
\`\`\`

### Classes and Structures

\`\`\`swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func introduce() {
        print("I'm \\(name), \\(age) years old")
    }
}
\`\`\`

## iOS App Architecture

### View Controllers

In UIKit, view controllers manage views and handle user interactions.

\`\`\`swift
import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var label: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        label.text = "Hello, iOS!"
    }
}
\`\`\`

### SwiftUI (Modern Approach)

SwiftUI provides a declarative way to build user interfaces.

\`\`\`swift
import SwiftUI

struct ContentView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \\(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}
\`\`\`

## Key iOS Frameworks

### UIKit
- Foundation for iOS apps
- Views, view controllers, navigation
- Best for complex, custom UIs

### SwiftUI
- Modern, declarative UI framework
- Cross-platform (iOS, macOS, watchOS)
- Best for new projects

### Foundation
- Core data types, collections
- Networking, file management
- Date/time handling

### Core Data
- Object graph and persistence framework
- Database management
- Best for complex data models

## Building Your First App

### Step 1: Create the UI

\`\`\`swift
import SwiftUI

struct MyFirstApp: View {
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "star.fill")
                .font(.system(size: 50))
                .foregroundColor(.yellow)
            
            Text("Welcome to iOS!")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Button("Get Started") {
                print("Button tapped!")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
\`\`\`

### Step 2: Add Interactivity

\`\`\`swift
@State private var isToggled = false

Toggle("Enable Feature", isOn: $isToggled)
    .onChange(of: isToggled) { newValue in
        print("Toggle is now: \\(newValue)")
    }
\`\`\`

## Best Practices

1. **Use Optionals Safely**: Always handle nil cases
2. **Follow MVC/MVVM Patterns**: Keep code organized
3. **Write Unit Tests**: Test your business logic
4. **Use Auto Layout**: Create responsive UIs
5. **Follow Human Interface Guidelines**: Design for iOS users
6. **Optimize Performance**: Profile your app regularly
7. **Handle Errors Gracefully**: Use do-catch blocks

## Testing Your App

### Simulator
- Test on various iOS devices
- Available in Xcode
- Good for development

### Physical Device
- Test real-world performance
- Requires Apple Developer account
- Best for final testing

## Next Steps

1. Learn about navigation (NavigationView, NavigationStack)
2. Explore data persistence (UserDefaults, Core Data)
3. Study networking (URLSession, async/await)
4. Understand app lifecycle
5. Learn about notifications and background tasks

## Conclusion

iOS development with Swift is an exciting journey. Start with the basics, build simple apps, and gradually tackle more complex features. The iOS ecosystem offers powerful tools and frameworks that make building great apps enjoyable and rewarding.

Remember: Practice regularly, read Apple's documentation, and don't hesitate to experiment. Happy coding!`
  },
  {
    id: 2,
    slug: 'ios-mvc-vs-mvvm-vs-viper',
    title: 'iOS: MVC vs MVVM vs VIPER',
    date: 'January 20, 2024',
    readTime: 15,
    excerpt: 'A deep dive into iOS architectural patterns. Compare MVC, MVVM, and VIPER to understand when to use each pattern in your iOS applications.',
    tags: ['iOS', 'Architecture', 'MVC', 'MVVM', 'VIPER', 'Design Patterns'],
    content: `# iOS: MVC vs MVVM vs VIPER

Choosing the right architectural pattern is crucial for building maintainable, scalable iOS applications. In this article, we'll compare three popular patterns: MVC, MVVM, and VIPER, and help you decide which one fits your project.

## Model-View-Controller (MVC)

MVC is Apple's default architecture pattern and the most widely used in iOS development.

### Structure

- **Model**: Data and business logic
- **View**: User interface elements
- **Controller**: Mediates between Model and View

### Example

\`\`\`swift
// Model
struct User {
    let name: String
    let email: String
}

// View (Storyboard/XIB or programmatic)
class UserView: UIView {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
}

// Controller
class UserViewController: UIViewController {
    @IBOutlet weak var userView: UserView!
    var user: User?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updateView()
    }
    
    func updateView() {
        guard let user = user else { return }
        userView.nameLabel.text = user.name
        userView.emailLabel.text = user.email
    }
}
\`\`\`

### Pros

✅ Simple and easy to understand  
✅ Apple's default pattern  
✅ Great for small to medium projects  
✅ Extensive documentation and resources  
✅ Works well with Storyboards  

### Cons

❌ View Controllers can become "Massive View Controllers"  
❌ Tight coupling between components  
❌ Difficult to test business logic  
❌ Can lead to code duplication  

### When to Use

- Small to medium-sized projects
- Rapid prototyping
- Teams new to iOS development
- Simple CRUD applications

---

## Model-View-ViewModel (MVVM)

MVVM separates presentation logic from the view, making code more testable and maintainable.

### Structure

- **Model**: Data and business logic
- **View**: User interface (passive)
- **ViewModel**: Presentation logic and state management

### Example

\`\`\`swift
// Model
struct User {
    let name: String
    let email: String
}

// ViewModel
class UserViewModel {
    private let user: User
    
    var displayName: String {
        return user.name.uppercased()
    }
    
    var displayEmail: String {
        return user.email.lowercased()
    }
    
    init(user: User) {
        self.user = user
    }
}

// View
class UserViewController: UIViewController {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    
    var viewModel: UserViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bindViewModel()
    }
    
    func bindViewModel() {
        nameLabel.text = viewModel.displayName
        emailLabel.text = viewModel.displayEmail
    }
}
\`\`\`

### With SwiftUI and Combine

\`\`\`swift
import SwiftUI
import Combine

class UserViewModel: ObservableObject {
    @Published var name: String = ""
    @Published var email: String = ""
    
    private let user: User
    
    init(user: User) {
        self.user = user
        self.name = user.name
        self.email = user.email
    }
}

struct UserView: View {
    @StateObject var viewModel: UserViewModel
    
    var body: some View {
        VStack {
            Text(viewModel.name)
            Text(viewModel.email)
        }
    }
}
\`\`\`

### Pros

✅ Better separation of concerns  
✅ Highly testable ViewModels  
✅ Works excellently with SwiftUI  
✅ Reduces "Massive View Controller" problem  
✅ Easier to maintain and refactor  

### Cons

❌ More boilerplate code  
❌ Learning curve for data binding  
❌ Can be overkill for simple screens  
❌ Requires understanding of reactive programming  

### When to Use

- Medium to large projects
- SwiftUI applications
- When testability is important
- Complex presentation logic
- Teams comfortable with reactive patterns

---

## VIPER

VIPER is an architecture pattern that takes separation of concerns to the extreme, making it ideal for large, complex applications.

### Structure

- **View**: Displays UI and sends user actions to Presenter
- **Interactor**: Contains business logic
- **Presenter**: Contains presentation logic
- **Entity**: Plain data objects
- **Router**: Handles navigation

### Example

\`\`\`swift
// Entity
struct User {
    let name: String
    let email: String
}

// Interactor
protocol UserInteractorInput {
    func fetchUser()
}

class UserInteractor: UserInteractorInput {
    weak var presenter: UserPresenterInput?
    
    func fetchUser() {
        // Network call or database fetch
        let user = User(name: "John", email: "john@example.com")
        presenter?.userFetched(user)
    }
}

// Presenter
protocol UserPresenterInput {
    func viewDidLoad()
    func userFetched(_ user: User)
}

protocol UserPresenterOutput: AnyObject {
    func displayUser(name: String, email: String)
}

class UserPresenter: UserPresenterInput {
    weak var view: UserPresenterOutput?
    var interactor: UserInteractorInput?
    var router: UserRouterInput?
    
    func viewDidLoad() {
        interactor?.fetchUser()
    }
    
    func userFetched(_ user: User) {
        view?.displayUser(name: user.name, email: user.email)
    }
}

// View
protocol UserViewInput: AnyObject {
    func showUser(name: String, email: String)
}

class UserViewController: UIViewController, UserViewInput {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    
    var presenter: UserPresenterInput?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.viewDidLoad()
    }
    
    func showUser(name: String, email: String) {
        nameLabel.text = name
        emailLabel.text = email
    }
}

// Router
protocol UserRouterInput {
    func navigateToDetail()
}

class UserRouter: UserRouterInput {
    weak var viewController: UIViewController?
    
    func navigateToDetail() {
        // Navigation logic
    }
}
\`\`\`

### Pros

✅ Maximum separation of concerns  
✅ Highly testable (each layer independently)  
✅ Scalable for large teams  
✅ Clear responsibilities  
✅ Easy to add new features  

### Cons

❌ Significant boilerplate code  
❌ Steep learning curve  
❌ Overkill for small projects  
❌ More files and complexity  
❌ Can slow down development initially  

### When to Use

- Large, complex applications
- Large development teams
- Long-term projects
- When maximum testability is required
- Enterprise applications

---

## Comparison Table

| Feature | MVC | MVVM | VIPER |
|---------|-----|------|-------|
| **Complexity** | Low | Medium | High |
| **Boilerplate** | Low | Medium | High |
| **Testability** | Low | High | Very High |
| **Learning Curve** | Easy | Medium | Steep |
| **Team Size** | Small-Medium | Medium-Large | Large |
| **Project Size** | Small-Medium | Medium-Large | Large |
| **SwiftUI Support** | Limited | Excellent | Limited |

## Migration Path

### MVC → MVVM
1. Extract presentation logic to ViewModel
2. Move business logic out of ViewController
3. Use data binding (Combine/SwiftUI)
4. Gradually refactor screen by screen

### MVVM → VIPER
1. Separate Interactor from ViewModel
2. Create Router for navigation
3. Define protocols for each layer
4. Refactor one module at a time

## Best Practices

1. **Start Simple**: Begin with MVC, migrate when needed
2. **Be Consistent**: Use the same pattern across the app
3. **Don't Over-Engineer**: Choose the pattern that fits your needs
4. **Consider Team**: Factor in team experience and size
5. **Plan for Growth**: Consider future scalability

## Hybrid Approaches

You can also combine patterns:

- **MVC + MVVM**: Use MVVM for complex screens, MVC for simple ones
- **MVVM + Coordinator**: Use Coordinators for navigation with MVVM
- **VIPER + MVVM**: Use MVVM within VIPER's View layer

## Conclusion

- **MVC**: Best for beginners and small projects
- **MVVM**: Best for modern SwiftUI apps and medium projects
- **VIPER**: Best for large, enterprise applications

The right choice depends on your project size, team experience, and long-term goals. Start with what you know, and evolve your architecture as your project grows.

Remember: There's no "one-size-fits-all" solution. The best architecture is the one that makes your code maintainable, testable, and enjoyable to work with!`
  },
  {
    id: 3,
    slug: 'swiftui-comprehensive-guide',
    title: 'SwiftUI: A Comprehensive Guide',
    date: 'January 25, 2024',
    readTime: 18,
    excerpt: 'Master SwiftUI, Apple\'s modern declarative UI framework. Learn how to build beautiful, responsive iOS applications with less code and more power.',
    tags: ['SwiftUI', 'iOS', 'UI Framework', 'Swift', 'Apple'],
    content: `# SwiftUI: A Comprehensive Guide

SwiftUI is Apple's modern, declarative framework for building user interfaces across all Apple platforms. Introduced in 2019, it has revolutionized iOS development by making UI creation more intuitive and powerful.

## What is SwiftUI?

SwiftUI is a framework that lets you build user interfaces declaratively. Instead of imperatively describing how to build a UI, you describe what the UI should look like, and SwiftUI figures out how to render it.

### Key Benefits

✅ **Declarative Syntax**: Describe UI, not implementation  
✅ **Cross-Platform**: One codebase for iOS, macOS, watchOS, tvOS  
✅ **Live Previews**: See changes instantly  
✅ **Less Code**: More concise than UIKit  
✅ **Automatic Updates**: UI updates when data changes  
✅ **Built-in Animations**: Easy to add smooth animations  

## Getting Started

### Basic View

\`\`\`swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .font(.largeTitle)
            .foregroundColor(.blue)
            .padding()
    }
}
\`\`\`

### Preview

SwiftUI's preview feature lets you see your UI in real-time.

\`\`\`swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
\`\`\`

## Core Concepts

### Views

Everything in SwiftUI is a view. Views are structs that conform to the \`View\` protocol.

\`\`\`swift
struct MyView: View {
    var body: some View {
        // Your UI here
    }
}
\`\`\`

### Modifiers

Modifiers transform views. Chain them to build complex UIs.

\`\`\`swift
Text("Hello")
    .font(.headline)
    .foregroundColor(.blue)
    .padding()
    .background(Color.yellow)
    .cornerRadius(10)
\`\`\`

### State Management

SwiftUI uses property wrappers to manage state.

#### @State

For local view state.

\`\`\`swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \\(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}
\`\`\`

#### @Binding

For two-way data binding.

\`\`\`swift
struct ToggleView: View {
    @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Enable", isOn: $isOn)
    }
}

struct ParentView: View {
    @State private var isEnabled = false
    
    var body: some View {
        ToggleView(isOn: $isEnabled)
    }
}
\`\`\`

#### @ObservedObject

For external observable objects.

\`\`\`swift
class UserData: ObservableObject {
    @Published var name = "John"
    @Published var age = 25
}

struct UserView: View {
    @ObservedObject var userData: UserData
    
    var body: some View {
        VStack {
            Text(userData.name)
            Text("\\(userData.age)")
        }
    }
}
\`\`\`

#### @StateObject

For creating and owning an observable object.

\`\`\`swift
struct ContentView: View {
    @StateObject private var userData = UserData()
    
    var body: some View {
        UserView(userData: userData)
    }
}
\`\`\`

#### @EnvironmentObject

For shared data across the view hierarchy.

\`\`\`swift
class AppSettings: ObservableObject {
    @Published var theme: Theme = .light
}

struct ContentView: View {
    @StateObject private var settings = AppSettings()
    
    var body: some View {
        NavigationView {
            ChildView()
        }
        .environmentObject(settings)
    }
}

struct ChildView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Text("Current theme: \\(settings.theme)")
    }
}
\`\`\`

## Layout System

### VStack (Vertical Stack)

\`\`\`swift
VStack(alignment: .leading, spacing: 20) {
    Text("First")
    Text("Second")
    Text("Third")
}
\`\`\`

### HStack (Horizontal Stack)

\`\`\`swift
HStack(spacing: 10) {
    Image(systemName: "star.fill")
    Text("Rating")
    Spacer()
    Text("5.0")
}
\`\`\`

### ZStack (Overlay Stack)

\`\`\`swift
ZStack {
    Color.blue
    Text("Overlay")
        .foregroundColor(.white)
}
\`\`\`

### LazyVStack and LazyHStack

For efficient scrolling with many items.

\`\`\`swift
ScrollView {
    LazyVStack {
        ForEach(0..<1000) { index in
            Text("Item \\(index)")
        }
    }
}
\`\`\`

## Lists

### Basic List

\`\`\`swift
List {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}
\`\`\`

### Dynamic List

\`\`\`swift
struct Item: Identifiable {
    let id = UUID()
    let name: String
}

struct ItemListView: View {
    let items = [
        Item(name: "Apple"),
        Item(name: "Banana"),
        Item(name: "Orange")
    ]
    
    var body: some View {
        List(items) { item in
            Text(item.name)
        }
    }
}
\`\`\`

### List with Sections

\`\`\`swift
List {
    Section("Fruits") {
        Text("Apple")
        Text("Banana")
    }
    
    Section("Vegetables") {
        Text("Carrot")
        Text("Broccoli")
    }
}
\`\`\`

## Navigation

### NavigationView

\`\`\`swift
NavigationView {
    List {
        NavigationLink("Details", destination: DetailView())
    }
    .navigationTitle("Home")
}
\`\`\`

### NavigationStack (iOS 16+)

\`\`\`swift
NavigationStack {
    List {
        NavigationLink("Details", value: "detail")
    }
    .navigationDestination(for: String.self) { value in
        DetailView()
    }
    .navigationTitle("Home")
}
\`\`\`

## Forms and Input

### Form

\`\`\`swift
Form {
    Section("Personal Info") {
        TextField("Name", text: $name)
        TextField("Email", text: $email)
    }
    
    Section("Settings") {
        Toggle("Notifications", isOn: $notificationsEnabled)
        Picker("Theme", selection: $selectedTheme) {
            Text("Light").tag(Theme.light)
            Text("Dark").tag(Theme.dark)
        }
    }
}
\`\`\`

### TextField

\`\`\`swift
@State private var username = ""

TextField("Username", text: $username)
    .textFieldStyle(.roundedBorder)
    .autocapitalization(.none)
\`\`\`

### SecureField

\`\`\`swift
@State private var password = ""

SecureField("Password", text: $password)
\`\`\`

## Animations

### Implicit Animations

\`\`\`swift
@State private var scale: CGFloat = 1.0

Button("Animate") {
    scale = scale == 1.0 ? 1.5 : 1.0
}
.scaleEffect(scale)
.animation(.spring(), value: scale)
\`\`\`

### Explicit Animations

\`\`\`swift
Button("Animate") {
    withAnimation(.spring()) {
        scale = scale == 1.0 ? 1.5 : 1.0
    }
}
\`\`\`

### Custom Animations

\`\`\`swift
.animation(
    .easeInOut(duration: 0.5)
    .repeatCount(3, autoreverses: true),
    value: isAnimating
)
\`\`\`

## Advanced Topics

### Custom Modifiers

\`\`\`swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(Color.white)
            .cornerRadius(10)
            .shadow(radius: 5)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}

// Usage
Text("Hello")
    .cardStyle()
\`\`\`

### ViewBuilder

\`\`\`swift
@ViewBuilder
func createView() -> some View {
    if condition {
        Text("True")
    } else {
        Text("False")
    }
}
\`\`\`

### GeometryReader

For responsive layouts based on available space.

\`\`\`swift
GeometryReader { geometry in
    VStack {
        Text("Width: \\(geometry.size.width)")
        Text("Height: \\(geometry.size.height)")
    }
}
\`\`\`

## Integration with UIKit

### UIViewRepresentable

\`\`\`swift
struct MyUIKitView: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        let view = UIView()
        view.backgroundColor = .blue
        return view
    }
    
    func updateUIView(_ uiView: UIView, context: Context) {
        // Update the view
    }
}
\`\`\`

### UIViewControllerRepresentable

\`\`\`swift
struct MyViewController: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        return MyUIKitViewController()
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
        // Update the view controller
    }
}
\`\`\`

## Best Practices

1. **Keep Views Small**: Break complex views into smaller components
2. **Use @State for Local State**: Only for view-specific state
3. **Prefer @StateObject over @ObservedObject**: When creating the object
4. **Leverage Previews**: Test different states and configurations
5. **Use Modifiers Wisely**: Chain them logically
6. **Optimize Lists**: Use LazyVStack/LazyHStack for large datasets
7. **Handle Errors**: Use Result types and proper error handling

## Common Patterns

### MVVM with SwiftUI

\`\`\`swift
class ViewModel: ObservableObject {
    @Published var items: [Item] = []
    
    func loadItems() {
        // Load data
    }
}

struct ContentView: View {
    @StateObject private var viewModel = ViewModel()
    
    var body: some View {
        List(viewModel.items) { item in
            Text(item.name)
        }
        .onAppear {
            viewModel.loadItems()
        }
    }
}
\`\`\`

## Conclusion

SwiftUI represents the future of Apple platform development. Its declarative syntax, powerful features, and cross-platform capabilities make it an excellent choice for building modern applications.

Start with the basics, experiment with different components, and gradually explore advanced features. The SwiftUI community is vibrant, and Apple continues to enhance the framework with each release.

Happy coding with SwiftUI!`
  },
  {
    id: 4,
    slug: 'integrate-compose-with-swift',
    title: 'Integrate Compose with Swift',
    date: 'January 30, 2024',
    readTime: 14,
    excerpt: 'Learn how to integrate Jetpack Compose (Android\'s modern UI toolkit) with Swift iOS applications. Explore cross-platform UI solutions and interoperability.',
    tags: ['iOS', 'Swift', 'Jetpack Compose', 'Cross-Platform', 'Kotlin Multiplatform'],
    content: `# Integrate Compose with Swift

Jetpack Compose is Android's modern declarative UI toolkit, and with Kotlin Multiplatform Mobile (KMM), you can share business logic and even UI code between Android and iOS. This guide explores how to integrate Compose with Swift iOS applications.

## Understanding the Landscape

### What is Jetpack Compose?

Jetpack Compose is Google's modern toolkit for building native Android UIs. It uses a declarative approach similar to SwiftUI, allowing developers to build UIs with less code.

### Kotlin Multiplatform Mobile (KMM)

KMM enables sharing code between Android and iOS while maintaining native UI experiences. However, Compose Multiplatform extends this to share UI code as well.

## Approaches to Integration

### Approach 1: Compose Multiplatform (Recommended)

Compose Multiplatform allows you to write UI once and run it on both Android and iOS.

#### Setup

1. **Create a KMM Project**

\`\`\`kotlin
// shared/build.gradle.kts
plugins {
    kotlin("multiplatform")
    id("org.jetbrains.compose")
}

kotlin {
    iosX64()
    iosArm64()
    iosSimulatorArm64()
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material)
            }
        }
    }
}
\`\`\`

2. **Create Compose UI**

\`\`\`kotlin
// shared/src/commonMain/kotlin/App.kt
@Composable
fun App() {
    MaterialTheme {
        var count by remember { mutableStateOf(0) }
        
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("Count: \\(count)")
            Button(onClick = { count++ }) {
                Text("Increment")
            }
        }
    }
}
\`\`\`

3. **Integrate with SwiftUI**

\`\`\`swift
// iOS App
import SwiftUI
import shared

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ComposeView()
                .ignoresSafeArea()
        }
    }
}

struct ComposeView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        ComposeUIViewController()
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
        // Updates if needed
    }
}
\`\`\`

\`\`\`kotlin
// iOS-specific implementation
import androidx.compose.ui.window.ComposeUIViewController

fun ComposeUIViewController() = ComposeUIViewController { App() }
\`\`\`

### Approach 2: Shared Business Logic with Native UI

Keep UI native but share business logic between platforms.

#### Shared ViewModel

\`\`\`kotlin
// shared/src/commonMain/kotlin/ViewModel.kt
class SharedViewModel {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()
    
    fun increment() {
        _count.value++
    }
}
\`\`\`

#### Swift Integration

\`\`\`swift
import SwiftUI
import shared
import Combine

class ViewModel: ObservableObject {
    private let sharedViewModel = SharedViewModel()
    private var cancellables = Set<AnyCancellable>()
    
    @Published var count: Int = 0
    
    init() {
        sharedViewModel.count
            .asPublisher()
            .assign(to: &$count)
    }
    
    func increment() {
        sharedViewModel.increment()
    }
}

struct ContentView: View {
    @StateObject private var viewModel = ViewModel()
    
    var body: some View {
        VStack {
            Text("Count: \\(viewModel.count)")
            Button("Increment") {
                viewModel.increment()
            }
        }
    }
}
\`\`\`

### Approach 3: Hybrid Approach

Use Compose for specific screens/modules while keeping the main app in SwiftUI.

\`\`\`swift
struct HybridApp: View {
    @State private var showComposeScreen = false
    
    var body: some View {
        NavigationView {
            VStack {
                Button("Open Compose Screen") {
                    showComposeScreen = true
                }
            }
            .sheet(isPresented: $showComposeScreen) {
                ComposeScreenView()
            }
        }
    }
}
\`\`\`

## Practical Example: Todo App

### Shared Data Model

\`\`\`kotlin
// shared/src/commonMain/kotlin/Todo.kt
data class Todo(
    val id: String,
    val title: String,
    val completed: Boolean
)
\`\`\`

### Shared Repository

\`\`\`kotlin
// shared/src/commonMain/kotlin/TodoRepository.kt
class TodoRepository {
    private val todos = mutableStateListOf<Todo>()
    
    fun getAllTodos(): List<Todo> = todos.toList()
    
    fun addTodo(title: String) {
        todos.add(Todo(
            id = UUID.randomUUID().toString(),
            title = title,
            completed = false
        ))
    }
    
    fun toggleTodo(id: String) {
        val index = todos.indexOfFirst { it.id == id }
        if (index >= 0) {
            todos[index] = todos[index].copy(completed = !todos[index].completed)
        }
    }
}
\`\`\`

### Compose UI

\`\`\`kotlin
@Composable
fun TodoScreen(repository: TodoRepository) {
    val todos by repository.getAllTodos().collectAsState(initial = emptyList())
    var newTodoTitle by remember { mutableStateOf("") }
    
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Todo List", style = MaterialTheme.typography.h4)
        
        TextField(
            value = newTodoTitle,
            onValueChange = { newTodoTitle = it },
            label = { Text("New Todo") }
        )
        
        Button(onClick = {
            repository.addTodo(newTodoTitle)
            newTodoTitle = ""
        }) {
            Text("Add")
        }
        
        LazyColumn {
            items(todos) { todo ->
                TodoItem(todo) {
                    repository.toggleTodo(todo.id)
                }
            }
        }
    }
}
\`\`\`

### SwiftUI Wrapper

\`\`\`swift
struct TodoComposeView: UIViewControllerRepresentable {
    let repository: TodoRepository
    
    func makeUIViewController(context: Context) -> UIViewController {
        ComposeUIViewController { TodoScreen(repository: repository) }
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
        // Update if needed
    }
}
\`\`\`

## Data Flow Between Platforms

### Passing Data from Swift to Compose

\`\`\`swift
class SharedData: ObservableObject {
    @Published var userName: String = ""
    
    func updateName(_ name: String) {
        userName = name
        // Update shared ViewModel
        sharedViewModel.updateUserName(name)
    }
}
\`\`\`

### Receiving Data from Compose

\`\`\`kotlin
class SharedViewModel {
    private val _userName = MutableStateFlow("")
    val userName: StateFlow<String> = _userName.asStateFlow()
    
    fun updateUserName(name: String) {
        _userName.value = name
    }
}
\`\`\`

## Best Practices

### 1. Keep Platform-Specific Code Separate

\`\`\`kotlin
expect class Platform() {
    val name: String
}

// iOS implementation
actual class Platform actual constructor() {
    actual val name: String = "iOS"
}
\`\`\`

### 2. Use StateFlow for Reactive Data

\`\`\`kotlin
class ViewModel {
    private val _state = MutableStateFlow(State())
    val state: StateFlow<State> = _state.asStateFlow()
}
\`\`\`

### 3. Handle Platform-Specific Features

\`\`\`kotlin
expect fun showToast(message: String)

// iOS implementation
actual fun showToast(message: String) {
    // Use iOS-specific notification
}
\`\`\`

### 4. Optimize Performance

- Use LazyColumn/LazyRow in Compose
- Implement proper state management
- Cache shared data appropriately

## Challenges and Solutions

### Challenge 1: Navigation

**Solution**: Use platform-specific navigation

\`\`\`swift
// SwiftUI handles navigation
NavigationLink("Details", destination: DetailView())
\`\`\`

### Challenge 2: Platform-Specific APIs

**Solution**: Use expect/actual mechanism

\`\`\`kotlin
expect fun getDeviceInfo(): String
\`\`\`

### Challenge 3: State Synchronization

**Solution**: Use StateFlow and Combine

\`\`\`swift
import Combine

sharedViewModel.state
    .asPublisher()
    .sink { state in
        // Update SwiftUI state
    }
\`\`\`

## When to Use Each Approach

### Use Compose Multiplatform When:
- You want maximum code sharing
- UI is similar across platforms
- Team is comfortable with Kotlin
- You're building a new app

### Use Shared Logic + Native UI When:
- Platforms have different UX requirements
- You want native look and feel
- Team has platform-specific expertise
- You're maintaining existing apps

## Tools and Resources

- **Kotlin Multiplatform Mobile**: Official KMM documentation
- **Compose Multiplatform**: Compose for desktop and mobile
- **KMM Plugin**: IntelliJ IDEA plugin for KMM
- **Sample Projects**: GitHub repositories with examples

## Conclusion

Integrating Compose with Swift opens up exciting possibilities for cross-platform development. Whether you choose Compose Multiplatform for shared UI or shared business logic with native UIs, both approaches offer significant benefits in code reuse and development efficiency.

Start with a small proof of concept, understand the data flow between platforms, and gradually expand your integration. The Kotlin Multiplatform ecosystem is rapidly evolving, making it an increasingly viable option for cross-platform mobile development.

Remember: The best approach depends on your team's expertise, project requirements, and long-term goals. Choose what works best for your specific situation!`
  },
  {
    id: 5,
    slug: 'modern-web-development-trends',
    title: 'Modern Web Development Trends in 2024',
    date: 'February 5, 2024',
    readTime: 10,
    excerpt: 'Explore the latest trends and technologies shaping web development in 2024. From frameworks to tools, stay ahead of the curve.',
    tags: ['Web Development', 'Trends', 'Frontend', 'Technology'],
    content: `# Modern Web Development Trends in 2024

The web development landscape continues to evolve rapidly. Let's explore the key trends and technologies that are shaping the industry in 2024.

## Framework Evolution

### React 19 and Server Components

React continues to innovate with server components and improved performance.

### Next.js 14+

The App Router and server-side rendering capabilities make Next.js a top choice for production applications.

### Vue 3 Composition API

Vue's Composition API provides better code organization and TypeScript support.

## Performance Optimization

### Core Web Vitals

Focus on LCP, FID, and CLS metrics for better user experience and SEO.

### Edge Computing

Deploy applications closer to users with edge functions and CDNs.

## AI Integration

### AI-Powered Development Tools

Tools like GitHub Copilot and ChatGPT are transforming how developers write code.

### AI in User Experiences

Integrating AI features directly into web applications for enhanced user interactions.

## Conclusion

Stay updated with these trends to build modern, performant web applications.`
  },
  {
    id: 6,
    slug: 'full-stack-development-guide',
    title: 'The Complete Guide to Full-Stack Development',
    date: 'February 10, 2024',
    readTime: 12,
    excerpt: 'Master full-stack development with this comprehensive guide covering frontend, backend, databases, and deployment strategies.',
    tags: ['Full-Stack', 'Backend', 'Frontend', 'Development'],
    content: `# The Complete Guide to Full-Stack Development

Full-stack development involves working on both the frontend and backend of web applications. This guide covers everything you need to know.

## Frontend Technologies

### Modern Frameworks

- React, Vue, Angular
- Next.js, Nuxt.js
- Svelte

### State Management

- Redux, Zustand
- Context API
- React Query

## Backend Technologies

### Server-Side Languages

- Node.js with Express
- Python with Django/Flask
- Java with Spring Boot

### APIs

- RESTful APIs
- GraphQL
- WebSockets

## Databases

### SQL Databases

- PostgreSQL
- MySQL
- SQLite

### NoSQL Databases

- MongoDB
- Redis
- Firebase

## Deployment

### Cloud Platforms

- AWS
- Vercel
- Heroku
- DigitalOcean

## Conclusion

Full-stack development requires knowledge across multiple domains. Start with fundamentals and gradually expand your expertise.`
  }
];

export const getBlogPosts = () => {
  return blogPosts;
};

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

