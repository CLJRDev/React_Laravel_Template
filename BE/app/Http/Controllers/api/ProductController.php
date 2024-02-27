<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Product::all();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //Validation
    $formFields = $request->validate([
      'name' => 'required',
    ]);

    //Save image into storage/public/images
    if ($request->hasFile('image')) {
      $formFields['image'] = $request->file('image')->store('images', 'public');
    }

    Product::create($formFields);
    return response()->json([
      'message' => 'Created successfully!'
    ]);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Product $product)
  {
    return $product;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Product $product)
  {
    $formFields = $request->validate([
      'name' => 'required'
    ]);

    if ($request->hasFile('image')) {
      //Delete existing image
      $storage = Storage::disk('public');
      if ($product->image != null)
        $storage->delete($product->image);
      //Add new image
      $formFields['image'] = $request->file('image')->store('images', 'public');
    }

    //Update product
    $product->update($formFields);
    return response()->json([
      'message' => 'Updated successfully!'
    ]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Product $product)
  {
    //Delete image
    $storage = Storage::disk('public');
    if ($product->image != null) {
      $storage->delete($product->image);
    }
    $product->delete();
    return response()->json([
      'message' => 'Deleted successfully!'
    ]);
  }
}
