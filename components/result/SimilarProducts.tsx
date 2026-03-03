"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { SimilarProduct } from "@/types";

type SimilarProductsProps = {
  products: SimilarProduct[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Similar Products Found</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-start gap-3 rounded-lg border border-border p-3"
          >
            {product.favicon ? (
              <img
                src={product.favicon}
                alt=""
                className="mt-0.5 h-5 w-5 rounded"
                loading="lazy"
              />
            ) : (
              <div className="mt-0.5 h-5 w-5 rounded bg-muted" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.name}</span>
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <Badge variant="outline" className="mt-1 text-xs">
                {product.confidence}% match
              </Badge>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.reason}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
